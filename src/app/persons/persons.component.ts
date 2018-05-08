import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PersonsService } from '../persons.service';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import { Person }	from '../person';


@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html',
	styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {
	

	alive: boolean;
	getPersonInterval;
	persons: Person[];
	cols: any[];
	selectedColumns: any[];
	selectedPersons:any[];

	constructor(private personsService: PersonsService) {
		this.alive = true;
	}

	onGet() {
		this.personsService.getPersons().subscribe(
			(persons) => {
				this.persons = persons
			},
			(error) => console.error(error)
		);
	}

	onDelete() {
		const deletePersons= this.selectedPersons.map(({ id }) => id)
		JSON.stringify(deletePersons);
		this.personsService.deletePersons(deletePersons).subscribe(
			(response) => {
				if(response.ok = 1) {
					this.onGet();
				} else {
					console.error("Something went wrong");
				}
			},
			(error) => console.error(error)
		)
		console.log(deletePersons);
	}

	ngOnInit() {
		this.onGet();

		IntervalObservable.create(5000)
			.takeWhile(() => this.alive)
			.subscribe(() => this.onGet()
		);
		
		this.cols = [
			{ field: 'fullName', header: 'Namn' },
			{ field: 'firstName', header: 'Förnamn' },
			{ field: 'lastName', header: 'Efternamn' },
			{ field: 'phone', header: 'Telefonnummer' },
			{ field: 'email', header: 'Epostadress' },
			{ field: 'dateOfBirthFormat', header: 'Fördelsedatum' },
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

	ngOnDestroy() {
		this.alive = false;
	}
    
}

