import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import { NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  providers: [NgbDatepickerConfig],
})

export class AddPersonComponent implements OnInit {

  constructor(
    private personService: PersonsService,
    private parserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    config: NgbDatepickerConfig,
  ) {
    config.minDate = {year: 1900, month: 1, day: 1};
  }

  // Save new person method (called on submit)
  save(personForm: FormGroup) {
    console.log('Saving');

    personForm.value.churchIdentity = JSON.parse(sessionStorage['userData'])._id;

    this.personService.addPerson(personForm.value).subscribe(
      (response) => {
        console.log(response);

        // Send notification if success.
        this.messageService.add({
          severity: 'success',
          summary: 'Sparat',
          detail: response.firstName + ' ' + response.lastName + ' sparad'
        });

        // Sen person back if success
        this.router.navigate(['/persons']);
      },
      (error) => {
        console.error(error);

        // Send notification about error
        this.messageService.add({
          severity: 'error',
          summary: 'Något gick fel',
          detail: 'Testa igen eller kontakta teknisk support'
        });
      }
    );
  }

  ngOnInit() {}
}


