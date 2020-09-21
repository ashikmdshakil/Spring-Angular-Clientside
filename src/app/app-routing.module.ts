import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { RoleComponent } from './content/role/role.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path : "", component: LoginComponent },
  { path : "login", component : LoginComponent},
  { path : "content", component : ContentComponent},
  { path : "logout" , component : LoginComponent},
  { path : "edit_role", component : RoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
