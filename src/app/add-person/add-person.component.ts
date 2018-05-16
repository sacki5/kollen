import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import {NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  providers: [NgbDatepickerConfig],

})
export class AddPersonComponent implements OnInit {

  constructor(private personService: PersonsService, private parserFormatter: NgbDateParserFormatter, config: NgbDatepickerConfig ) {
   config.minDate = {year: 1900, month: 1, day: 1};

    }

  save(personForm: FormGroup) {
    personForm.value.dateOfBaptism = this.parserFormatter.format(personForm.value.dateOfBaptism);
    personForm.value.dateOfBirth = this.parserFormatter.format(personForm.value.dateOfBirth);
    personForm.value.memberSince = this.parserFormatter.format(personForm.value.memberSince);

    console.log('Saving');
    console.log(personForm.value);

    this.personService.addPerson(personForm.value).subscribe(
      (response) => {
          console.log(response)
      },
      (error) => console.error(error)
    )
  }

  ngOnInit() {
    console.log('fiskbanan');
  }
}


