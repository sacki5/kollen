import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { MainComponent }        from './main/main.component';
import { PersonsComponent }     from './persons/persons.component';
import { GroupsComponent }      from './groups/groups.component';
import { AddPersonComponent}	from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', 
		component: MainComponent,
		children: [
			{
				path: 'persons',
				component: PersonsComponent
			},
			{
				path: 'persons/add',
				component: AddPersonComponent
			},
			{
				path: 'groups',
				component: GroupsComponent
			},
			{
				path: 'persons/edit/id',
				component: EditPersonComponent
			}
		]
	},
	{ path: '**', redirectTo: '/persons'},
];

@NgModule({
	
	imports: [ RouterModule.forRoot(routes), RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}


