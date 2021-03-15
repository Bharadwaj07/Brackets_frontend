import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  classList:any[];
  allAssignmentList:any[] =[];
  myassignmentList:any[] =[];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  constructor(private route:Router,private _classService:ClassService,private _assignService:AssignmentService) { }

  ngOnInit(): void {
    this._classService.getStudentsClass(this.currentUser._id).subscribe(data =>{
      this.classList = data;
    });
    this._assignService.getStudentsAssignment(this.currentUser._id).subscribe(data =>{
      this.myassignmentList =data;
    })
  }

  getLanguage(languageId){
    const index = this.languages.findIndex(ele => ele.id == languageId);
    return this.languages[index].language;
  }
}
