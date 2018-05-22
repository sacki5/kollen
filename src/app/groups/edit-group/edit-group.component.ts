import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group';
import { GroupsService } from '../groups.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { PersonsService } from '../../persons/persons.service';
import { Person }	from '../../persons/person';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  public group: Group;
  edit = false;
  persons: Person[];
  selectedPersons: any[];
  selectedContact: Person;
  updatedGroup: Group;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private personsService: PersonsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPersons();
    this.onGet(this.route.snapshot.params.id);

  }

  onGet(id) {
    this.groupsService.getGroup(id).subscribe(
      (group) => {
        console.log(group)
        this.group = group
        this.selectedPersons = group.members;
        this.selectedContact = group.contact.id;
      },
      (error) => console.error(error)
    )
  }

  save(groupForm: FormGroup) {

    groupForm.value.members = this.selectedPersons.map(function(item) { return item.id; });
    groupForm.value.contact = this.selectedContact;

    this.groupsService.updateGroup(this.route.snapshot.params.id, groupForm.value).subscribe(
      (response) => {
        console.log(response)

        this.messageService.add({
          severity: 'success',
          summary: 'Sparat',
          detail: response.name + ' sparad'
        });

        this.location.back();
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

  editTrue() {
    this.edit = true;
  }

  goBack(dirty) {
    if (dirty || this.edit ) {
      this.confirmationService.confirm({
        header: 'Bekräfta',
        acceptLabel: 'Ja',
        rejectLabel: 'Nej',
        message: 'Är du säker på att du vil lämna utan att spara?',
        accept: () => {
          this.router.navigate(['/groups']);
        }
    });
    } else {
      this.router.navigate(['/groups']);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
        header: 'Bekräfta "ta bort"',
        acceptLabel: 'Ja',
        rejectLabel: 'Nej',
        message: 'Är du säker att du vill ta bort "' + this.group.name + '"',
        accept: () => {
            this.onDelete()
        }
    });
  }

  onDelete() {
    this.groupsService.deleteGroup(this.route.snapshot.params.id).subscribe(
      (response) => {
        if (response.ok = 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Raderad',
            detail: 'Gruppen har tagits bort'
          });

          this.router.navigate(['/groups']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Något gick fel',
            detail: 'Testa igen eller kontakta teknisk support'
          });
          console.error('Something went wrong');
        }
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

  getPersons() {
    this.personsService.getPersonsNoPop().subscribe(
      (persons) => {
        this.persons = persons
        console.log(persons)
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


}
