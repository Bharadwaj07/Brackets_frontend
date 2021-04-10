import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.css']
})
export class EditorHeaderComponent implements OnInit {

  constructor(private route :Router) { }

  ngOnInit(): void {
  }
  navigate(dest){
    this.route.navigate(['/home'],{replaceUrl:true})
  }
}
