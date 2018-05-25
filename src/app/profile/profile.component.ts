import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  edit = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  getUser() {
    this.userService.getProfile().subscribe(
      (response) => {
        this.user = response;
        localStorage.setItem('userData', JSON.stringify(this.user));
      },
      (error) => console.error(error)
    );
  }

  goBack(dirty) {
    if (dirty || this.edit) {
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

  save(userForm: FormGroup) {

    if (userForm.value.password == null) {
      delete userForm.value.password;
    }

    this.userService.updateUser(userForm.value).subscribe(
      (response) => {
        
        this.getUser();

        this.messageService.add({
          severity: 'success',
          summary: 'Sparat',
          detail: response.church + ' sparad'
        });

      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Något gick fel',
          detail: 'Testa igen eller kontakta teknisk support'
        });
      }
    );
  }

  editTrue() {
    this.edit = true;
  }

  ngOnInit() {
    this.getUser();
  }

}
