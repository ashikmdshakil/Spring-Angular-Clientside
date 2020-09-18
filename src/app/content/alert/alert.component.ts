import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message : string = "Welcome to this app !!!";
  @Input() exist : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showAlert(message :string){
    this.message = message;
    this.exist = true;
  }

}
