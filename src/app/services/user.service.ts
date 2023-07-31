import { Injectable } from '@angular/core';
import { USERS } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn: boolean = false;

  getIsLoggedIn(): boolean{
    return this.isLoggedIn;
  }
  constructor() { }

  login(email: string, password: string): boolean {
    const user = USERS.find(u => u.email === email && u.password === password);
      if (user) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }
}
