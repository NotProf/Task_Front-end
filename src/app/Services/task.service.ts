import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // url = 'http://localhost:8080';
  url = 'http://ec2-3-19-242-222.us-east-2.compute.amazonaws.com:8080';
  header = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  constructor(private httpClient: HttpClient) { }

  addTask(task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url}/addTask`, task, {headers: this.header});
  }
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/getTasks`,  {headers: this.header});
  }
  removeTask(id): Observable<Task[]> {
    return this.httpClient.post<Task[]>(`${this.url}/removeTask`, id,{headers: this.header});
  }
  updateTask(task: Task) {
    return this.httpClient.post(`${this.url}/updateTask`, task, {headers: this.header});
  }
  shareTask(task, userId) {
    return this.httpClient.post(`${this.url}/shareTask/${task}`, userId, {headers: this.header});
  }
}
