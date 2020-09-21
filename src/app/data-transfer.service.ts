import { Injectable } from '@angular/core';
import { StudentComponent } from './content/student/student.component';
import { Student } from './content/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  student: Student;
  constructor() { }
  passData(student: Student){
    this.student = student;
  }
  getData(): Student{
    return this.student;
  }

}
