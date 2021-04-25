import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
import { ClassService } from 'src/app/services/class.service';
@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['./create-class-dialog.component.css']
})
export class CreateClassDialogComponent implements OnInit {
  classForm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,
    private _classService:ClassService,
  ) { }
  teacherList:any[];
  classCode:string;
  ngOnInit(): void {
    this._classService.getClassCode().subscribe(data =>{
      this.classCode= data.classCode;
    });
    this._classService.getAllTeachers().subscribe(data =>{
      this.teacherList = data;
      this.initForm();
    })
     
  }
  initForm(){
    this.classForm = this.fb.group({
      title:["",Validators.required],
      owner:['',Validators.required],
      teamCode:[this.classCode],
      isEnabled:[true]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    if(this.classForm.valid){
      this._classService.createClass(this.classForm.value).subscribe(data =>{
        console.log("class created  =>>",data);
      })
    }
    this.dialogRef.close();
  }
}
