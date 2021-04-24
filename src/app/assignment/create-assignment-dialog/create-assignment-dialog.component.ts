import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
import { ClassService } from 'src/app/services/class.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { TestCasesComponent } from './test-cases/test-cases.component';
@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent implements OnInit {
  assignmentForm:FormGroup;
  constructor(
    public dialog: MatDialog,
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
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  testCasesList:any[] =[];
  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      title:["",Validators.required],
      language:["",Validators.required],
      owner:[this.data._id],
      team:["",Validators.required],
      maxScore:[''],
      submission:["",Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      question:["",Validators.required],
      inputSample:[""],
      outputSample:[""],
    });
    this.thirdFormGroup = this.fb.group({
      testCases:this.fb.array([]),
    });

    this._classService.getAllClass(this.data._id).subscribe(data =>{
      this.classList = data;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteTestCase(title){
    const checkArray: FormArray = this.thirdFormGroup.get('testCases') as FormArray;
    const index = this.testCasesList.findIndex(ele => ele.title == title);
    checkArray.removeAt(index);
    this.testCasesList = this.testCasesList.filter(testcase => testcase.title !== title);
    console.log(this.thirdFormGroup.value)
  }
  openCreateTestCase(): void {
    const dialogRef = this.dialog.open(TestCasesComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const checkArray: FormArray = this.thirdFormGroup.get('testCases') as FormArray;
      if(result){
        checkArray.push(new FormControl(result));
        this.testCasesList.push(result);
      }
    });
  }
  reset(stepper){
    this.testCasesList = [];
    stepper.reset();
    
  }
  onSubmit(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      const data = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      }
      this._assignService.createAssignment(data).subscribe(d =>{
        console.log(d);
        this.dialogRef.close();
      })
    }
  }
}
