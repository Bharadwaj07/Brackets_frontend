import { Component, Inject, OnInit } from '@angular/core';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {
  testCaseForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<TestCasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,) { }

  ngOnInit(): void {
    this.testCaseForm = this.fb.group({
      title:['',Validators.required],
      inputs:['',Validators.required],
      outputs:['',Validators.required]
    });
  }
  onSubmit(){
    if(this.testCaseForm.valid){
      this.dialogRef.close(this.testCaseForm.value);
    }
  }

}
