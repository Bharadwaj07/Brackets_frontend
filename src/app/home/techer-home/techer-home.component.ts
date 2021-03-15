import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ClassService } from 'src/app/services/class.service';
import { CreateAssignmentDialogComponent } from '../../assignment/create-assignment-dialog/create-assignment-dialog.component';
import { CreateClassDialogComponent } from '../../class/create-class-dialog/create-class-dialog.component';
@Component({
  selector: 'app-techer-home',
  templateUrl: './techer-home.component.html',
  styleUrls: ['./techer-home.component.css']
})
export class TecherHomeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  allAssignmentList:any[];
  myassignmentList:any[];
  classList:any[];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  constructor(public dialog: MatDialog,private _classService:ClassService,private _assignService:AssignmentService) { }

  ngOnInit(): void {
    this._classService.getAllClass(this.currentUser._id).subscribe(data =>{
      this.classList = data;
    })
    this._assignService.getAllAssignment().subscribe(data =>{
      this.allAssignmentList = data;
    });
    this._assignService.getTeachersAssignment(this.currentUser._id).subscribe(data =>{
      console.log(data)
      this.myassignmentList = data
    })
  }
  openCreateClassDialog(): void {
    const dialogRef = this.dialog.open(CreateClassDialogComponent, {
      width: '300px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openCreateAssignmentDialog(): void {
    const dialogRef = this.dialog.open(CreateAssignmentDialogComponent, {
      width: '500px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  getLanguage(languageId){
    const index = this.languages.findIndex(ele => ele.id == languageId);
    return this.languages[index].language;
  }
}
