import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import { NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';



@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {
  public person: Person;
  newPerson: Person;
  id: Number;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonsService,
    private parserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    config: NgbDatepickerConfig
  ) {
    config.minDate = {year: 1900, month: 1, day: 1};
  }

  save(personForm: FormGroup) {

    console.log('Saving');

    // Need to assign because virtuals not supported on update
    this.person = personForm.value;
    Object.assign(this.person, {
      prevChurch: {
        churchName: personForm.value.prevChurchName,
        dateOfBaptism: personForm.value.dateOfBaptism
      },
      membership: {
        status: personForm.value.membershipStatus,
        since: personForm.value.memberSince
      },
      address: {
        addressLine1: personForm.value.addressLine1,
        zipcode: personForm.value.zipcode,
        city: personForm.value.city
      }
    });

    this.personService.updatePerson(this.route.snapshot.params.id, this.person).subscribe(
      (response) => {
          console.log(response)

          this.messageService.add({
            severity: 'success',
            summary: 'Sparat',
            detail: response.firstName + ' ' + response.lastName + ' sparad'
          });
      },
      (error) => {
        console.error(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Något gick fel',
          detail: 'Testa igen eller kontakta teknisk support'
        });
      }
    )
  }

  onGet(id) {
    this.personService.getPerson(id).subscribe(
      (person) => {
        this.person = person
      },
      (error) => console.error(error)
    )
  }



  ngOnInit() {
    this.onGet(this.route.snapshot.params.id);
    // console.log(this.personForm.value.firstname);
  }

}
