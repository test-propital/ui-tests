import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import {
  filter,
  map,
  Observable,
  take,
} from 'rxjs';
import { UsersService } from '../services/users.service';


@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private userService: UsersService, private router: Router) { }
  

  canLoad(): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete
      map((isAuthenticated) => {
        if (isAuthenticated) {
          console.log(isAuthenticated)
          // Directly open inside area
          this.router.navigateByUrl('main', { replaceUrl: true });
          return false;
        }
        return true;
      }),
    );
  }
}
