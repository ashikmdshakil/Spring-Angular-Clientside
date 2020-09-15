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

  constructor(std: StudentInfoService, httpService: HttpClient) 
  {
    this.studentService = std;
    this.http = httpService;
  }

  edit(id: number){
    this.id.emit(id);
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
  }
}
