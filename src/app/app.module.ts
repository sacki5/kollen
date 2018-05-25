import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/rx';
import { MatSidenavModule } from '@angular/material';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { SliderModule } from 'primeng/slider';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { GroupsComponent } from './groups/groups.component';
import { PersonsComponent } from './persons/persons.component';
import { AddPersonComponent } from './persons/add-person/add-person.component';
import { EditPersonComponent } from './persons/edit-person/edit-person.component';

import { PersonsService } from './persons/persons.service';
import { GroupsService } from './groups/groups.service';
import { UserService } from './user.service';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { RegisterComponent } from './register/register.component';
import { CanActivateViaAuthGuard } from './can-activate-via-auth-guard';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PersonsComponent,
    GroupsComponent,
    AddPersonComponent,
    EditPersonComponent,
    AddGroupComponent,
    EditGroupComponent,
    RegisterComponent,
    ProfileComponent,
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
    GrowlModule,
    SliderModule,
    ConfirmDialogModule
  ],
  providers: [
    PersonsService,
    GroupsService,
    MessageService,
    UserService,
    ConfirmationService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
