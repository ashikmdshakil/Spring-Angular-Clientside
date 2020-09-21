import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { DataTransferService } from 'src/app/data-transfer.service';
import { Role } from '../student/role.model';
import { Student } from '../student/student.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  id: number;
  name: string;
  student: Student = new Student();
  assignedRole: Role[];
  roles: Role[];
  user: boolean;
  super_user: boolean;
  admin: boolean;
  dataTransfer: DataTransferService;
  http : HttpClient;

  constructor(data: DataTransferService, http: HttpClient) {
    this.dataTransfer = data;
    this.http = http;
   }

  ngOnInit(): void {
    this.student = this.dataTransfer.getData();
    this.name= this.student.name;
    this.dataTransfer.student = null;
    this.getRoles(this.student.id);
  }

  getRoles(id: number){

    setInterval(()=>{
      let param1 = new HttpParams()
    .set('id' , id.toString());
    let user :any = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
  });
    this.http.get('http://localhost:8080/student',{params: param1, headers: headers, responseType:'json'}).subscribe((response)=>{
      let str = JSON.stringify(response['roles']);
      this.assignedRole = JSON.parse(str);
    });
    },1000);
}

print(){
  this.roles = [];
  if(this.user){
    this.roles.push(new Role('user'));
  }
  if(this.super_user){
    this.roles.push(new Role('super_user'));
  }
  if(this.admin){
    this.roles.push(new Role('admin'));
  }
  else{
    this.roles.push(new Role('user'));
  }
  this.student.roles = this.roles;
  let user :any = JSON.parse(localStorage.getItem('currentUser'));
  const headers = new HttpHeaders({
    authorization : 'Basic ' + btoa(user.username + ':' + user.password)
});
  headers.set('Content-Type', 'application/json; charset=utf-8');
  this.http.post('http://localhost:8080/setRoles',this.student,{ headers: headers }).subscribe((response)=>{
    console.log(response.toString());
  });
  
}
}