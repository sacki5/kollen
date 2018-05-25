import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  registerUser(user): Observable<any> {
    return this.http.post<any>('/api/register', user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>('/api/login', user);
  }

  Auth() {
    return this.http.get('/api/loggedin');
  }

  logoutUser(): Observable<any> {
    return this.http.get<any>('/api/logout');
  }

  getProfile(): Observable<any> {
    return this.http.get<any>('/api/profile');
  }

  updateUser(user): Observable<any> {
    console.log(user);
    return this.http.patch<any>('/api/updateUser', user);
  }
}
