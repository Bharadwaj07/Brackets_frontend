import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CreateClassDialogComponent } from 'src/app/class/create-class-dialog/create-class-dialog.component';
import { EvaluationService } from 'src/app/services/evaluation.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userDatasource: MatTableDataSource<any>;
  evaluationList:any[];
  classDataSource: MatTableDataSource<any>;
  assignmentDataSource: MatTableDataSource<any>;
  submissionDataSource: MatTableDataSource<any>;
  assignmentDisplayColumsn: string[] = ['owner', 'question', 'class', 'submissiondate']
  submissionsDisplayColumns: string[] = ['question', 'class', 'owner', 'submittedBy', 'submissionDate', 'status']
  userDisplayColumns: string[] = ['name', 'email', 'usertype', 'actions']
  classDisplayColumns: string[] = ['title', 'classteacher', 'no_students', 'actions']
  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private _class: ClassService,
    private _assignment: AssignmentService,
    private _evaluation:EvaluationService
  ) { }

  ngOnInit(): void {
    this._userService.getAllUser().subscribe(data => {
      // console.log(data)
      this.userDatasource = new MatTableDataSource(data);
    });
    this._class.listAllClass().subscribe(data => {
      this.classDataSource = new MatTableDataSource(data);
    });
    this._assignment.getAllAssignment().subscribe(data => {
      // console.log(data);
      this.assignmentDataSource = new MatTableDataSource(data);
    });
    this._assignment.listAllSubmissions().subscribe(data => {
      // console.log(data);
      this.submissionDataSource = new MatTableDataSource(data);
    })
    this._evaluation.listAllEvaluation().subscribe(data =>{
      console.log(data)
      this.evaluationList = data;
    })
  }

  isEvaluated(assignmentId){
    return this.evaluationList.find(ele => ele.assignment === assignmentId);
  }
  editUserType(element): void {
    console.log("hii")
    const dialogRef = this.dialog.open(EditUserTypeDialog, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  createClass(): void {
    const dialogRef = this.dialog.open(CreateClassDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
}

@Component({
  selector: 'edit-user-type-dialog',
  templateUrl: 'edit-user-type-dialog.html',
})
export class EditUserTypeDialog implements OnInit {
  myForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditUserTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userType: [''],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.myForm.valid) {
      this._userService.modifyUser(this.data._id, this.myForm.value.userType).subscribe(data => {
        if (data) {
          this.dialogRef.close();
        }
      })
    }
  }
}