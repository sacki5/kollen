import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import {MessageService} from 'primeng/components/common/messageservice';
import { Person }	from './person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {

  alive: boolean;
  getPersonInterval: number;
  persons: Person[];
  cols: any[];
  selectedColumns: any[];
  selectedPersons: any[];
  standardColumns: any[];
  // loading: boolean; // USED FOR LAZY LOADING
  // totalRecords: number; // USED FOR LAZY LOADING
  // datasource: Person[];// USED FOR LAZY LOADING

  constructor(private personsService: PersonsService, private messageService: MessageService ) {
    this.alive = true;

    this.standardColumns = [
      { field: 'fullName', header: 'Namn' },
      { field: 'phone', header: 'Telefonnummer' },
      { field: 'email', header: 'Epostadress' },
      { field: 'addressPretty', header: 'Adress' },
    ]
  }

  // Method to get persons, called on ngOnInit
  onGet() {
    this.personsService.getPersons().subscribe(
      (persons) => {
        this.persons = persons;
      console.log(persons);
        // this.datasource = persons // USED FOR LAZY LOADING
        // this.totalRecords = persons.length // USED FOR LAZY LOADING
      },
      (error) => {
        console.error(error)

        // Send error notification
        this.messageService.add({
          severity: 'error',
          summary: 'Kunde inte hämta från servern',
          detail: 'Testa igen senare eller kontakta teknisk support'
        });
      }
    );
  }



  resetSelectedColumns() {
    this.selectedColumns = this.standardColumns
    localStorage['selectedPersonColumns'] = JSON.stringify(this.selectedColumns)
  }

  // LAZY LOAD FUnCTION
  // onGetLazy(event: LazyLoadEvent) { //
  //   this.loading = true;
  //   console.log('loading');

  //   this.personsService.getPersons().subscribe(
  //     (persons) => {
  //       this.persons = this.datasource.slice(event.first, (event.first + event.rows));
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error(error)

  //       // Send error notification
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Kunde inte hämta från servern',
  //         detail: 'Testa igen senare eller kontakta teknisk support'
  //       });
  //     }
  //   );
  // }


  ngOnInit() {
    this.onGet();

    // Update persons every 10 second
    IntervalObservable.create(10000)
      .takeWhile(() => this.alive)
      .subscribe(() => this.onGet()
    );


    // Columns to use in table
    this.cols = [
      { field: 'fullName', header: 'Namn' },
      { field: 'firstName', header: 'Förnamn' },
      { field: 'lastName', header: 'Efternamn' },
      { field: 'addressPretty', header: 'Adress' },
      { field: 'city', header: 'Stad'},
      { field: 'dateOfBirthPretty', header: 'Födelsedatum' },
      { field: 'phone', header: 'Telefonnummer' },
      { field: 'email', header: 'Epostadress' },
      { field: 'membershipStatusPretty', header: 'Medlem' },
      { field: 'memberSincePretty', header: 'Medlem sedan' },
      { field: 'dateOfBaptismPretty', header: 'Dopdag' },
      // { field: 'tags', header: 'Taggar' },
    ];

    // Get selected columns from applicaton storage
    const stored = localStorage['selectedPersonColumns'];
    if (stored) {
      this.selectedColumns = JSON.parse(stored)
    } else {
      this.selectedColumns = this.standardColumns;
    };


    // this.loading = true; // USED FOR LAZY LOADING
  }

  ngOnDestroy() {
    this.alive = false;
    localStorage['selectedPersonColumns'] = JSON.stringify(this.selectedColumns);
  }
}

