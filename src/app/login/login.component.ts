import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
  }

  login(userForm: FormGroup) {

    this.userService.loginUser(userForm.value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('userData', JSON.stringify(response));
        this.router.navigate(['/persons']);
      },
      (error) => {
        console.error(error);

        // Send notification about error
        this.messageService.add({
          severity: 'error',
          summary: 'Fel användarnamn eller lösenord'
        });
      }
    );

  }

}
