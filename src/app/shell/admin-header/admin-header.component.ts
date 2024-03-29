import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('authToken');
    this.route.navigate(['login'])
  }
}
