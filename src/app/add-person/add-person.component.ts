import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import {NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import {MessageService} from 'primeng/components/common/messageservice';

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
    config: NgbDatepickerConfig,
    private location: Location ) {
   config.minDate = {year: 1900, month: 1, day: 1};
  }

  save(personForm: FormGroup) {
    console.log('Saving');
    console.log(personForm.value);

    this.personService.addPerson(personForm.value).subscribe(
      (response) => {
          console.log(response)

          this.messageService.add({
            severity: 'success',
            summary: 'Sparat',
            detail: response.firstName + ' ' + response.lastName + ' sparad'
          });

          this.location.back();
      },
      (error) => console.error(error)
    )
  }

  ngOnInit() {
  }
}


