import { Component, OnDestroy } from '@angular/core';
import { PersonsService } from './persons/persons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Kollen';


  ngOnDestroy() {

  }

}
