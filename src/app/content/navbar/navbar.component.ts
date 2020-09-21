import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentInfoService } from 'src/app/student-info.service';
import { Role } from '../student/role.model';
import { Student } from '../student/student.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentService: StudentInfoService;
  router: Router;
  http: HttpClient;
  assignedRoles : Role[] = [];
  student: Student = new Student();
  user_name: string;
  constructor(service: StudentInfoService, router : Router,http: HttpClient) {
    this.studentService = service;
    this.router = router;
    this.http = http;
   }

  ngOnInit(): void {

    setInterval(()=>{
      let user :any = JSON.parse(localStorage.getItem('currentUser'));
      this.user_name = user.username;
      let param1 = new HttpParams()
    .set('mail' , user.username);
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
    this.http.get('http://localhost:8080/liveRoles',{params: param1, headers: headers, responseType:'json'}).subscribe((response)=>{
      let str = JSON.stringify(response['roles']);
      this.assignedRoles = JSON.parse(str);
    });
    },1000);
  }

  logout(){
    this.studentService.logout();
    localStorage.removeItem('currentUser');
    this.user_name = null;
    this.router.navigate(['logout']);
  }

}
