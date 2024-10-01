import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class SessionService {
  static getToken(): string {
    return localStorage.getItem('userToken') || '';
  }

  static saveToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  static destroyToken() {
    localStorage.removeItem('userToken');
  }

  static getUser(): any {
    try {
      return JSON.parse(localStorage.getItem('chopiClientUser') || '');
    } catch (error) {
      return null;
    }
  }

  static saveUser(user: any) {
    localStorage.setItem('chopiClientUser', JSON.stringify(user));
  }

  static destroyUser() {
    localStorage.removeItem('chopiClientUser');
  }
}
