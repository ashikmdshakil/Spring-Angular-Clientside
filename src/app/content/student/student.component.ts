import { Component, OnInit } from '@angular/core';
import { StudentInfoService } from '../../student-info.service';
import { Student } from './student.model';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any = [];
  studentService: StudentInfoService;
  http :HttpClient;
  @Output() id = new EventEmitter<number>();
  @Output() message = new EventEmitter<string>();

  constructor(std: StudentInfoService, httpService: HttpClient) 
  {
    this.studentService = std;
    this.http = httpService;
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
}
