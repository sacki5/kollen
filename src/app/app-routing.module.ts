import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { MainComponent }        from './main/main.component';
import { PersonsComponent }     from './persons/persons.component';
import { GroupsComponent }      from './groups/groups.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: '', 
    component: MainComponent,
    children: [
      {
        path: 'persons',
        component: PersonsComponent,
       
      },
      {
        path: 'groups',
        component: GroupsComponent
      }
    ]
  },
  { path: 'dashboard', component: MainComponent},
  { path: '**', redirectTo: '/dashboard'},
];

@NgModule({
  
  imports: [ RouterModule.forRoot(routes), RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


