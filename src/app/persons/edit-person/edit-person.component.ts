import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../person';
import { PersonsService } from '../persons.service';
import { NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {

  // Declareation of class variables
  public person: Person;
  edit = false;

  constructor(
    private route: ActivatedRoute,
    private personsService: PersonsService,
    private parserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private router: Router,
    config: NgbDatepickerConfig ) {
    config.minDate = {year: 1900, month: 1, day: 1}; // Configuration of datepicker
  }

  ngOnInit() { this.onGet(this.route.snapshot.params.id); }

  // Save updated information method
  save(personForm: FormGroup) {
    console.log('Saving');

    this.personsService.updatePerson(this.route.snapshot.params.id, personForm.value).subscribe(
      (response) => {
          console.log(response)
          // Send success notification
          this.messageService.add({
            severity: 'success',
            summary: 'Sparat',
            detail: response.firstName + ' ' + response.lastName + ' sparad'
          });
          this.router.navigate(['/persons']);
      },
      (error) => {
        console.error(error)

        // Send error notification
        this.messageService.add({
          severity: 'error',
          summary: 'Något gick fel',
          detail: 'Testa igen eller kontakta teknisk support'
        });
      }
    )
  }

  confirmDelete() {
    this.confirmationService.confirm({
        header: 'Bekräfta "ta bort"',
        acceptLabel: 'Ja',
        rejectLabel: 'Nej',
        message: 'Är du säker att du vill ta bort "' + this.person.firstName + ' ' + this.person.lastName + '"',
        accept: () => {
            this.onDelete()
        }
    });
  }

  onDelete() {
    this.personsService.deletePersons(this.route.snapshot.params.id).subscribe(
      (response) => {
        if (response.ok = 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Raderad',
            detail: 'Användaren har tagits bort'
          });

          this.location.back();
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

  goBack(dirty) {
    if (dirty ) {
      this.confirmationService.confirm({
        header: 'Bekräfta',
        acceptLabel: 'Ja',
        rejectLabel: 'Nej',
        message: 'Är du säker på att du vil lämna utan att spara?',
        accept: () => {
          this.router.navigate(['/persons']);
        }
    });
    } else {
      this.router.navigate(['/persons']);
    }
  }

  editTrue() {
    this.edit = true;
  }

  print(): void {
    window.print()
  }

  // Method to get information, called on onInit.
  onGet(id) {
    this.personsService.getPerson(id).subscribe(
      (person) => {
        this.person = person
      },
      (error) => console.error(error)
    )
  }

  

}
