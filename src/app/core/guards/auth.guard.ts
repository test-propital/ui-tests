import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
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
export class AuthGuard implements CanLoad {
  constructor(private userService: UsersService, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      filter((value) => value !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this.userService.purgeAuth();
        return false;
      }),
    );
  }
}
