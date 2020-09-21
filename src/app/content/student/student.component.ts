import { Component, OnInit } from '@angular/core';
import { StudentInfoService } from '../../student-info.service';
import { Student } from './student.model';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/data-transfer.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student = new Student();
  students: any = [];
  studentService: StudentInfoService;
  http :HttpClient;
  router: Router;
  dataTransfer: DataTransferService;
  @Output() id = new EventEmitter<number>();
  @Output() message = new EventEmitter<string>();

  constructor(std: StudentInfoService, httpService: HttpClient, router: Router, dataTransfer: DataTransferService) 
  {
    this.studentService = std;
    this.http = httpService;
    this.router = router;
    this.dataTransfer= dataTransfer;
  }

  edit(id: number){
    this.id.emit(id);
  }
  passMessage(message : string){
    this.message.emit(message);
  }
  ngOnInit(): void {
    setInterval(()=>{
    let obs = this.studentService.getStudents();
    obs.subscribe((response)=>{
      this.students = response;
    });
  },1500);
  }
  delete(i : number){
    this.studentService.deleteStudent(i);
    let user: any = JSON.parse(localStorage.getItem('currentUser'));
    if(user.authorities[0].authority == 'user'){
      this.passMessage("You are not authorized to delete .");
    }
    else{
      this.passMessage("deletion is successfull !");
    }  
  }
  editRole(id: number, mail: string, name: string, department: string){
    this.student.id = id;
    this.student.mail = mail;
    this.student.name = name;
    this.student.department = department;
    this.dataTransfer.passData(this.student);    
    this.router.navigate(['edit_role']);
  }
}
