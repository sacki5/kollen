import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PersonsComponent } from './persons/persons.component';
import { GroupsComponent } from './groups/groups.component';
import { PersonsService } from './persons.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		MainComponent,
		TopbarComponent,
		SidenavComponent,
		PersonsComponent,
		GroupsComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTableModule,
		MatSidenavModule,
		MatToolbarModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		TableModule,
		MultiSelectModule
	],
	providers: [PersonsService],
	bootstrap: [AppComponent]
})
export class AppModule { }
