import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SessionService } from './session.service';
import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject = new BehaviorSubject<any>({} as any);

  user:any;

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  token = '';

  constructor(
    private apiService: ApiService,
    private router:Router,
    private notificationsService:NotificationsService
  ) {
      this.loadToken();
     }

    static jwtDecode(token: string): any {
      try {
        return jwt_decode(token);
      } catch (error) {
        return null;
      }
    }
    loadToken() {
      const token = SessionService.getToken();
      if (token) {
        this.isAuthenticated.next(true);
      } else {
        this.isAuthenticated.next(false);
      }
    }
    checkTokenExp(): void {
      const token = SessionService.getToken();
      if (token !== '') {
        const now = Math.trunc(new Date().getTime() / 1000);
        const decodedToken:any = jwt_decode(token);
        if (now > decodedToken.exp) {
          this.purgeAuth();
        }
      } else {
        this.purgeAuth();
      }
    }
    setAuth(user: any) {
      // Save JWT sent from server in storage
      this.updateAuthData(user);/// //here
    }
    updateAuthData(user: any) {
      // Save user data from server in localstorage
      SessionService.saveUser(user);
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticated.next(true);
      console.log(this.isAuthenticated)
    }
    purgeAuth() {
      // Remove JWT from storage

      SessionService.destroyToken();
      SessionService.destroyUser();
      // Set current user to an empty object
      this.currentUserSubject.next({} as any);
      // Set auth status to false
      this.isAuthenticated.next(false);
      this.router.navigate(['/']);
    }
    getCurrentUser(): any {
      if (!this.currentUserSubject.value.token) {
        const user = SessionService.getUser();
        this.currentUserSubject.next(user);
      }
      return this.currentUserSubject.value;
    }
    logger(credentials:any):Observable<any> {
      return this.apiService.post("/auth/login", credentials).pipe(
        map((data) => {
          console.log(data)
          SessionService.saveToken(data.token);
          const decodedToken = UsersService.jwtDecode(data.token);
          const response = {
            token: data.token,
            decodedToken,
            user:data.user,
          };
          if(response.user.isActive === false){
            this.purgeAuth()
            return null
          }else{
            return response;
          }
        })
      );
    }

    /*attemptAuth(user:any):Observable<any> {

      const id = user.id? user.id : '';
        return this.getUserById(id)
        .pipe(
          map((data) => {
            this.setAuth({ ...user, ...data });
            return user;
          }),
        );
    }*/
    attemptAuth(user: any): Observable<any> {
      const id = user.id ? user.id : '';
      console.log(id)
      return forkJoin({
          //this.getUserById(id),
       // cartData: this.cartService.getMyCartId(id) //this.getUserRole(id)
        notification:this.notificationsService.getNotificationsByUserId()
      }).pipe(

        switchMap(({ notification//, roleData

        }) => {
          

          const combinedData = { ...user//,// ...notification
        };
          this.setAuth(combinedData);
          return of(combinedData);
        })
      );
    }


    getUsersList(
      page?: number,
      perPage?: number,
      searchQuery?: string
    ): Observable<any> {
      let url = `/users/?page=${page}&perPage=${perPage}`;

      if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
      }

      return this.apiService.get(url);
    }
    registerUser(body:any): Observable<any>{
      return this.apiService.post("/auth/register",body)
    }



}
