import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../Models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authorization = false;

  constructor(private httpClient: HttpClient) { }
  // url = 'http://localhost:8080';
  url = 'http://ec2-3-19-242-222.us-east-2.compute.amazonaws.com:8080';
  header = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  login(user) {
    return this.httpClient.post(`${this.url}/login`, user, {observe: 'response'});
  }
  registration(user: User)  {
    return this.httpClient.post(`${this.url}/registration`, user);
  }
  check(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/check`, {headers: this.header});
  }
  activateAccount(key: string) {
    return this.httpClient.get(`${this.url}/activate/${key}`);
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/getUsers`, {headers: this.header});
  }
  checkUsername(name: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.url}/checkUsername`, name);
  }
}
