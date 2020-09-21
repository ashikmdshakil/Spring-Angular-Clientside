import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { StudentInfoService } from '../../student-info.service';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Student } from '../student/student.model';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  @Input() id: number = null;
  @Input() name: string = null;
  @Input() mail: string = null;
  @Input() department: string = null;
  @Input() password: string = null;
  @Output() message = new EventEmitter<string>();

  http: HttpClient;
  studentService: StudentInfoService;

  constructor(std: StudentInfoService, httpsService : HttpClient)  
  {
    this.studentService = std;
    this.http = httpsService;
  }

  ngOnInit(): void {
    
  }
  save(): void{
    if(this.id == null){
      this.studentService.registerStudents(this.name, this.mail, this.department, this.password);
      let user: any = JSON.parse(localStorage.getItem('currentUser'));
      this.passMessage("Saving is successfull !");
    }
    else{
      this.studentService.updateStudents(this.id ,this.name, this.mail, this.department, this.password);
      this.passMessage("Updating is successfull !");
    } 
    this.id = null;
    this.name = null;
    this.mail = null;
    this.department = null; 
    this.password = null;
    
    
  }
  passMessage(message : string){
    this.message.emit(message);
  }
 

}
