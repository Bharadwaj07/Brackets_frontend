import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ClassService } from 'src/app/services/class.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { TestCasesComponent } from '../create-assignment-dialog/test-cases/test-cases.component';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  assignmentForm: FormGroup;
  assignmentData:any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private _classService: ClassService, private _assignService: AssignmentService,) { }
  classList: any[];
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
  testCasesList: any[] = [];
  ngOnInit(): void {
    this._assignService.getAssignment(this.data.id).subscribe(data =>{
      console.log(data);
      this.assignmentData = data;
      this.initForm();
    })
    this._classService.getAllClass(this.currentUser._id).subscribe(data =>{
      this.classList = data;
    })
  }
  initForm(){
    this.firstFormGroup = this.fb.group({
      title:[this.assignmentData.title],
      language:[parseInt(this.assignmentData.language)],
      owner:[this.currentUser._id],
      team:[this.assignmentData.team],
      maxScore:[this.assignmentData.maxScore],
      submission:[this.assignmentData.submission]
    });
    this.secondFormGroup = this.fb.group({
      question:[this.assignmentData.question,Validators.required],
      inputSample:[this.assignmentData.inputSample],
      outputSample:[this.assignmentData.outputSample],
    });
    this.thirdFormGroup = this.fb.group({
      testCases:this.fb.array([...this.assignmentData.testCases]),
    });
    this.testCasesList = this.assignmentData.testCases;
  }
  onNoClick(): void {
    this.dialogRef.close();
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
    console.log(this.firstFormGroup.value)
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      const data = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      }
      this._assignService.modifyAssignment(this.assignmentData._id,data).subscribe(d =>{
        console.log(d);
        this.dialogRef.close();
      })
    }
  }

}
