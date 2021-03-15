import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
import { ClassService } from 'src/app/services/class.service';
import { AssignmentService } from 'src/app/services/assignment.service';
@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent implements OnInit {
  assignmentForm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,
    private _classService:ClassService,private _assignService:AssignmentService,
  ) { }
  classList:any[];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      title:["",Validators.required],
      question:["",Validators.required],
      language:["",Validators.required],
      inputSample:[""],
      outputSample:[""],
      owner:[this.data._id],
      team:[""],
    });

    this._classService.getAllClass(this.data._id).subscribe(data =>{
      this.classList = data;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    if(this.assignmentForm.valid){
      console.log("hii")
      const data = this.assignmentForm.value;
      this._assignService.createAssignment(data).subscribe(d =>{
        console.log(d);
        this.dialogRef.close();
      })
    }
  }
}
