import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>('http://localhost:3000/api/group', group)
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('http://localhost:3000/api/groups')
  }

  getGroup(id): Observable<Group> {
    return this.http.get<Group>('http://localhost:3000/api/group/' + id)
  }

  deleteGroup(id): Observable<any> {
    return this.http.delete<Group>('http://localhost:3000/api/group/' + id)
  }

  updateGroup(id, group: Group): Observable<Group> {
    return this.http.patch<Group>('http://localhost:3000/api/group/' + id, group)
  }
}
