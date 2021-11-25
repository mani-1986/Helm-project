import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'manage-user/:id', component: ManageUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
