import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { MatSidenavModule } from '@angular/material';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PersonsComponent } from './persons/persons.component';
import { GroupsComponent } from './groups/groups.component';
import { PersonsService } from './persons.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    TopbarComponent,
    PersonsComponent,
    GroupsComponent,
    AddPersonComponent,
    EditPersonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TableModule,
    MultiSelectModule,
    NgbModule.forRoot(),
    GrowlModule
  ],
  providers: [PersonsService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
