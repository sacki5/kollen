import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { PersonsService } from '../persons.service';

@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html',
	styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
	constructor(private personsService: PersonsService) {}

	persons;
	cols: any[];
	selectedColumns: any[];
	selectedPersons;

	onGet() {
		this.personsService.getPersons().subscribe(
			(response) => {
				this.persons = response.persons;
				console.log(this.persons);
			},
			(error) => console.log(error)
		);
	}

	ngOnInit() {
		this.onGet();

		this.cols = [
			{ field: 'fullName', header: 'Namn' },
			{ field: 'firstName', header: 'Förnamn' },
			{ field: 'lastName', header: 'Efternamn' },
			{ field: 'phone', header: 'Telefonnummer' },
			{ field: 'email', header: 'Epostadress' },
			{ field: 'dateOfBirth', header: 'Fördelsedatum' },
			{ field: 'Address', header: 'Adress' },
			{ field: 'city', header: 'Stad'},
			{ field: 'membershipStatus', header: 'Medlem' },
			{ field: 'tags', header: 'Taggar' },
		];

		this.selectedColumns = [
			{ field: 'fullName', header: 'Namn' },
			{ field: 'phone', header: 'Telefonnummer' },
			{ field: 'email', header: 'Epostadress' },
			{ field: 'Address', header: 'Adress' },
			{ field: 'tags', header: 'Taggar' },
		];
	}
}

