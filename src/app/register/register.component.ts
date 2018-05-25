import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
  }

  register(userForm: FormGroup) {

    this.userService.registerUser(userForm.value).subscribe(
      (response) => {

        if (response != null) {
          console.log(response);

          this.messageService.add({
            severity: 'success',
            summary: 'Användare registrerad',
            detail: response.church
          });

          this.router.navigate(['/login']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Epost upptagen',
            detail: 'Testa igen med annan epostadress'
          });
        }

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

}
