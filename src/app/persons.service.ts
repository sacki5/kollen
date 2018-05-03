import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PersonsService {

	constructor(private http: HttpClient) {}

		getPersons(): Observable<any> {
			return this.http.get('http://localhost:3000/api/persons');
	 }
	 
}
	