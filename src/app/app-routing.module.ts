import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PersonsComponent } from './persons/persons.component';
import { GroupsComponent } from './groups/groups.component';
import { AddPersonComponent}	from './persons/add-person/add-person.component';
import { EditPersonComponent } from './persons/edit-person/edit-person.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';

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
        path: 'persons/edit/:id',
        component: EditPersonComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'groups/add',
        component: AddGroupComponent
      },
      {
        path: 'groups/edit/:id',
        component: EditGroupComponent
      },
    ]
  },
  { path: '**', redirectTo: '/persons'},
];

@NgModule({

  imports: [ RouterModule.forRoot(routes), RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


