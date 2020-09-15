import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentInfoService } from 'src/app/student-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentService: StudentInfoService;
  router: Router;

  constructor(service: StudentInfoService, router : Router) {
    this.studentService = service;
    this.router = router;
   }

  ngOnInit(): void {
  }

  logout(){
    this.studentService.logout();
    localStorage.removeItem('currentUser');
    this.router.navigate(['logout']);
  }

}
