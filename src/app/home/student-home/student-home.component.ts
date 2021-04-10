import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ClassService } from 'src/app/services/class.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private route:Router,
    private _classService:ClassService,
    private _assignService:AssignmentService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this._classService.getStudentsClass(this.currentUser._id).subscribe(data =>{
      console.log(data);
      this.classList = data;
    });
    this._assignService.getStudentsAssignment(this.currentUser._id).subscribe(data =>{
      this.myassignmentList =data;
    })
  }

  joinClass(): void {
    console.log("hii")
    const dialogRef = this.dialog.open(JoinClassComponent, {
      width: '250px',
      data: this.currentUser._id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  getLanguage(languageId){
    const index = this.languages.findIndex(ele => ele.id == languageId);
    return this.languages[index].language;
  }
  // navigateToEditor(id){
  //   this.route.n
  // }
}

@Component({
  selector: 'join-class-dialog',
  templateUrl: 'join-class-dialog.html',
})
export class JoinClassComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<JoinClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private _classService:ClassService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      teamCode: [''],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.myForm.valid) {
      this._classService.joinClass(this.myForm.value.teamCode,this.data).subscribe(data =>{
        console.log(data);
        if(data){
          this.dialogRef.close();
        }
        else{
          alert("Invalid Class Code")
        }
      })
    }
  }
}