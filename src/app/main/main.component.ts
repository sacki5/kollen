import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  opened: boolean;
  churchName: any;

  constructor() {
    this.churchName = 'Immanuelskyrkan Malmö';
    this.opened = true;
  }

  ngOnInit() { }

}
