import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {
  dataSource:MatTableDataSource<any>;
  displayedColumns:string[] =["date","user","action"]
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe(params =>{
      id = params.get('id');
    });
  }

}
