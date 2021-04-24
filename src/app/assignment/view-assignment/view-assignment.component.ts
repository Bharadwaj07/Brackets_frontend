import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["language", "assignement_title", "class", "submission_date",'view_submission','action']
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  constructor(
    private route: ActivatedRoute,
    private _assignmentService: AssignmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._assignmentService.getTeachersAssignment(this.currentUser._id).subscribe(data => {
      this.dataSource = data;
    })
  }
  editDialog(id): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '550px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  deleteAssignment(id){
    this._assignmentService.deleteAssignment(id).subscribe(data =>{
      console.log(data);
    })
  }
  getLanguage(id){
    const lang =this.languages.find(l => l.id ==id);
    return lang.language;
  }
}
