import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  openEditor(){
    this.route.navigate(['editor'])
  }
}
