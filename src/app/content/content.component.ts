import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from './student/student.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent{

  id: number;
  name: string;
  mail: string;
  department: string;
  password:  string;
  role: string;
  http: HttpClient;
  student: Student; 
  constructor(http: HttpClient){
    this.http = http;
  }

  editStudent(id : number){
    let param1 = new HttpParams()
    .set('id' , id.toString());
   
    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });

    this.http.get('http://localhost:8080/student',{params: param1, headers: headers}).subscribe((response)=>{
      let responseString = JSON.stringify(response);
      this.student = JSON.parse(responseString);
      this.id = this.student.id; 
      this.name = this.student.name;
      this.mail = this.student.mail;
      this.department = this.student.department;
      this.password = this.student.password;
      this.role = this.student.role; 
    });
  }
}
