import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  username: string;
  http:HttpClient;
  authenticated: boolean = false;
  router: Router;
  message: string;

  
  constructor(httpService: HttpClient , router: Router) {
    this.http = httpService;
    this.router = router;
   }
  ngOnInit(): void {
  }
  authenticate(){
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(this.username + ':' + this.password)
  });
    this.http.get('http://localhost:8080/login',{headers: headers, responseType: "json"}).subscribe(response => {
      if(response != null){
        let user :any = response['principal']; 
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['content']);
      }
      else{
        this.message = "Authentication failed.";
      }
   
});
  

  }

}
