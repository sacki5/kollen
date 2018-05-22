import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';

import { Group } from '../group';
import { Person }	from '../../persons/person';
import { GroupsService } from '../groups.service';
import { PersonsService } from '../../persons/persons.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  persons: Person[];
  selectedPersons: any[];
  selectedContact;

  constructor(
    private groupsService: GroupsService,
    private location: Location,
    private messageService: MessageService,
    private personsService: PersonsService
  ) { }

  save(groupForm: FormGroup) {
    console.log('Saving Group');

    const newGroup = groupForm.value
    newGroup.members = this.selectedPersons.map(function(item) { return item.id; });
    newGroup.contact = this.selectedContact;

    console.log(newGroup);
    this.groupsService.addGroup(newGroup).subscribe(
      (response) => {
        console.log(response)

         // Send notification if success.
         this.messageService.add({
          severity: 'success',
          summary: 'Sparat',
          detail: response.name + ' sparad'
        });

        // Sen person back if success
        this.location.back();
      },
      (error) => {
        console.error(error)

        // Send notification about error
        this.messageService.add({
          severity: 'error',
          summary: 'Något gick fel',
          detail: 'Testa igen eller kontakta teknisk support'
        });
      }
    )
  }

  getPersons() {
    this.personsService.getPersons().subscribe(
      (persons) => {
        this.persons = persons
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

  ngOnInit() {
    this.getPersons()
  }

}
