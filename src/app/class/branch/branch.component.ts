import { Component, Inject, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch.service';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branchForm:FormGroup
  classStudents:any[];
  constructor(public dialogRef: MatDialogRef<BranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private _branchService:BranchService) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.addBranch){
      this.branchForm = this.fb.group({
        title:['',Validators.required],
        team:[this.data.addBranch.classData._id],
        students:[],
      });
      this.classStudents = this.data.addBranch.classStudents
    }
    if(this.data.editBranch){
      this.branchForm = this.fb.group({
        title:[this.data.editBranch.title,Validators.required],
        team:[this.data.editBranch.team],
        students:[this.data.editBranch.students],
      });
      this.classStudents = this.data.editBranch.classStudents
    }
  }
  onSubmit(){
    if(this.data.addBranch){
      if(this.branchForm.valid){
        this._branchService.createBranch(this.branchForm.value).subscribe(data =>{
          this.dialogRef.close()
        })
      }
    }
    if(this.data.editBranch){
      if(this.branchForm.valid){
        this._branchService.modifyBranch(this.data.editBranch._id,this.branchForm.value).subscribe(data =>{
          this.dialogRef.close()
        })
      }
    }
  }
}
