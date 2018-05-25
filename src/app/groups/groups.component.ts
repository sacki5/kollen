import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { GroupsService } from './groups.service';
import {MessageService} from 'primeng/components/common/messageservice';
import { Group } from './group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  alive: boolean;
  getGroupInterval: number;
  groups: Group[];
  cols: any[];
  selectedColumns: any[];
  selectedPersons: any[];
  standardColumns: any[];



  constructor(private groupsService: GroupsService, private messageService: MessageService ) {
    this.alive = true;

    this.standardColumns = [
      { field: 'name', header: 'Namn' },
      { field: 'typePretty', header: 'Typ' },
      { field: 'contactName', header: 'Kontakt' },
      { field: 'numMembers', header: 'Antalet medlemmar' },
    ];
  }

  onGet() {

    this.groupsService.getGroups().subscribe(
      (groups) => {
        this.groups = groups;
        console.log(groups);
      },
      (error) => {
        console.error(error);

        // Send error notification
        this.messageService.add({
          severity: 'error',
          summary: 'Kunde inte hämta från servern',
          detail: 'Testa igen senare eller kontakta teknisk support'
        });
      }
    );
  }

  resetSelectedColumns() {
    this.selectedColumns = this.standardColumns;
    localStorage['selectedGroupColumns'] = JSON.stringify(this.selectedColumns);
  }

  ngOnInit() {
    this.onGet();

    this.cols = [
      { field: 'name', header: 'Namn' },
      { field: 'typePretty', header: 'Typ' },
      { field: 'description', header: 'Beskrivning' },
      { field: 'numMembers', header: 'Antalet medlemmar' },
      { field: 'membersNames', header: 'Medlemmar' },
      { field: 'contactName', header: 'Kontakt' },
      { field: 'contactPhone', header: 'Telefon' },
      { field: 'contactEmail', header: 'epostadress' },
    ];

    const stored = localStorage['selectedGroupColumns'];
    if (stored) {
      this.selectedColumns = JSON.parse(stored);
    } else {
      this.selectedColumns = this.standardColumns;
    }
  }

  ngOnDestroy() {
    this.alive = false;
    localStorage['selectedGroupColumns'] = JSON.stringify(this.selectedColumns);
  }

}


