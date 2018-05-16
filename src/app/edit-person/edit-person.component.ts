import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import { NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

  constructor(private personService: PersonsService, private parserFormatter: NgbDateParserFormatter, config: NgbDatepickerConfig ) {
		config.minDate = {year: 1900, month: 1, day: 1};
  }
  
  firstname = 'riger';  

  save(personForm: FormGroup) {
    personForm.value.dateOfBaptism = this.parserFormatter.format(personForm.value.dateOfBaptism);
		personForm.value.dateOfBirth = this.parserFormatter.format(personForm.value.dateOfBirth);
		personForm.value.memberSince = this.parserFormatter.format(personForm.value.memberSince);

    console.log('Saving');
		console.log(personForm.value);
  }

  ngOnInit() {
  
  }

}
