import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { Person } from '../persons/person';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  opened: boolean;
  churchName: any;
  stored;


  constructor(
      private userService: UserService,
      private router: Router,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) {

    this.router.events.subscribe((val) => {
      if (localStorage['userData']) {
        this.churchName = JSON.parse(localStorage['userData']).church;
      }
    });

    this.churchName = JSON.parse(localStorage['userData']).church;
    this.opened = true;
  }

  ngOnInit() { }


  logout() {

    this.confirmationService.confirm({
      header: 'Logga ut',
      acceptLabel: 'Ja',
      rejectLabel: 'Nej',
      message: 'Är du säker att du vill logga ut',
      accept: () => {

        this.userService.logoutUser().subscribe(
          (response) => {
            if (response) {

              localStorage.clear();

              this.messageService.add({
                severity: 'info',
                summary: 'Utloggad'
              });
              this.router.navigate(['/login']);
            }
          }
        );

      }
  });


  }
}
