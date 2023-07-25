import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

const _api = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(_api + '/user');
  }
  
  login(email: string, password: string): Observable<any>{
    const body = { email, password };
    return this.http.post<any>(_api + '/user', body);
  }
}
