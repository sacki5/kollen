import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  getUser() {
    this.userService.getProfile().subscribe(
      (response) => this.user = response,
      (error) => console.error(error)
    );
  }

  save(userForm: FormGroup) {

    if (userForm.value.password == null) {
      delete userForm.value.password;
    }

    this.userService.updateUser(userForm.value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('userData', JSON.stringify(response));
        this.router.navigate(['/profile']);
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

  ngOnInit() {
    this.getUser();
  }

}
