import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './content/student/student.component';
import { StudentInfoService } from './student-info.service';
import { StudentFormComponent } from './content/student-form/student-form.component'
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './content/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { AlertComponent } from './content/alert/alert.component';
import { RoleComponent } from './content/role/role.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentFormComponent,
    NavbarComponent,
    LoginComponent,
    ContentComponent,
    AlertComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StudentInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
