import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navDest:any;
  constructor(private route: Router) {
    this.navDest = this.route.parseUrl(
      this.route.url
    )
   }
  
  ngOnInit(): void {

  }

  isUserAuthenticated(){
    console.log(this.navDest)
  }
  isEditor(){
    return true;
  }
}
