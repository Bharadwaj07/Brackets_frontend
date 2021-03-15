import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
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
  studentsList:any[];
  ngOnInit(): void {
    this.classForm = this.fb.group({
      title:["",Validators.required],
      owner:[this.data._id],
      students:this.fb.array([]),
    });
    this._classService.getAllStudents().subscribe(students =>{
      this.studentsList = students;
    });
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.classForm.get('students') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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
