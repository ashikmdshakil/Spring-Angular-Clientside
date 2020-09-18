import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Student } from './content/student/student.model'
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  http : HttpClient;

  

  constructor(httpService: HttpClient) {
      this.http = httpService;
   }


  registerStudents(name: string, mail:string, department: string, password: string){
    let param1 = new HttpParams()
    .set('name' , name)
    .set('mail' , mail)
    .set('department', department)
    .set('password', password);
    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
  console.log(mail);

     this.http.get('http://localhost:8080/save',{params: param1,headers: headers,responseType : "text"}).subscribe((response) =>{
        console.log(response.toString());      
     })
  }

  updateStudents(id: number, name: string, mail:string, department: string, password: string): void{
    let param1 = new HttpParams()
    .set('id', id.toString())
    .set('name' , name)
    .set('mail' , mail)
    .set('department', department)
    .set('password', password)

    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
   
    this.http.get('http://localhost:8080/update',{params: param1, headers: headers , responseType : "text"}).subscribe((response)=>{
      console.log(response);
    });
  }

  deleteStudent(id: number){
    let param1 = new HttpParams()
    .set('id' , id.toString());
    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
   
    this.http.get('http://localhost:8080/deleteId',{params: param1, headers: headers}).subscribe((response)=>{
      console.log(response);
    });

  }

  getStudents(): Observable<any>{
    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
    return this.http.get('http://localhost:8080/students',{headers: headers});
  }

  

  logout(){
    this.http.post('http://localhost:8080/logout',{});
  }

}
