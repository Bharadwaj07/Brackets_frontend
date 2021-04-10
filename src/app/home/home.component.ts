import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userType :string;
  userTeacher:string = "TEACHER";
  userStudent:string = "STUDENT";
  userAdmin:string = "ADMIN"
  constructor(private route:Router) { }
  panelOpenState = false;
  ngOnInit(): void {
    this.userType = JSON.parse(localStorage.getItem('currentUser')).userType;
    // console.log(this.userType)
  }

}
