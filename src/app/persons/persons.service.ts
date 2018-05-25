import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Person } from './person';

@Injectable()
export class PersonsService {

  constructor(private http: HttpClient) {}

    addPerson(person: Person): Observable<Person> {
      return this.http.post<Person>('/api/person', person);
    }

    getPersons(): Observable<Person[]> {
      return this.http.get<Person[]>('/api/persons');
     }

     getPersonsNoPop(): Observable<Person[]> {
      return this.http.get<Person[]>('/api/persons/noPop');
     }

    deletePersons(id): Observable<any> {
      return this.http.delete<Person[]>('/api/persons/' + id);
    }

    getPerson(id): Observable<Person> {
      return this.http.get<Person>('/api/person/' + id);
    }

    updatePerson(id, person: Person): Observable<Person> {
      return this.http.patch<Person>('/api/person/' + id, person);
    }
}
