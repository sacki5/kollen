import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Person } from './person';

@Injectable()
export class PersonsService {

  constructor(private http: HttpClient) {}

    addPerson(person: Person): Observable<Person> {
      return this.http.post<Person>('http://localhost:3000/api/person', person)
    }

    getPersons(): Observable<Person[]> {
      return this.http.get<Person[]>('http://localhost:3000/api/persons')
     }

    deletePersons(body): Observable<any> {
      return this.http.delete<Person[]>('http://localhost:3000/api/persons/' + body)
    }

    getPerson(id): Observable<Person> {
      return this.http.get<Person>('http://localhost:3000/api/person/' + id)
    }

    updatePerson(id, person: Person): Observable<Person> {
      return this.http.patch<Person>('http://localhost:3000/api/person/' + id, person)
    }
}
