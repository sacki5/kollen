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
    return this.http.post<Group>('/api/group', group);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  getGroup(id): Observable<Group> {
    return this.http.get<Group>('/api/group/' + id);
  }

  deleteGroup(id): Observable<any> {
    return this.http.delete<Group>('/api/group/' + id);
  }

  updateGroup(id, group: Group): Observable<Group> {
    return this.http.patch<Group>('/api/group/' + id, group);
  }
}
