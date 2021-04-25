import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-run-test-cases',
  templateUrl: './run-test-cases.component.html',
  styleUrls: ['./run-test-cases.component.css']
})
export class RunTestCasesComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  code: string;
  language: string;
  testCaseResult: any[] = [];
  testCases: any[];
  assignmentData:any;
  constructor(
    public dialogRef: MatDialogRef<RunTestCasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private compileService: EditorService,
    private _assignmentService:AssignmentService,
    ) { }

  async ngOnInit() {
    this.code = this.data.code,
    this.language = this.data.language;
    this.assignmentData= this.data.assignmentData;
    console.log(this.assignmentData)
    if(this.data.testCases.length !== 0){
      this.testCases = this.data.testCases;
    }else{
      this.testCases = [{
        title:"TestCaseDefault",
        inputs:this.assignmentData.inputSample,
        outputs:this.assignmentData.outputSample
      }]
    }
    await this.runTestCase();
  }
  async runTestCase() {
    await Promise.all(
      this.testCases.map(async (testcase) => {
        this.compileTestCase(testcase.inputs, testcase.outputs,testcase.title).then((res: any) => {
          this.testCaseResult.push({ testcase, response: res.response })
        }).catch((err: any) => {
          this.testCaseResult.push({ testcase, response: err.response })
        })
      })
    );
  }
  compileTestCase(input, output,title) {
    return new Promise((reject, resolve) => {
      this.compileService.compileCode(this.language, this.code, input).subscribe(result => {
        if (result) {
          if (result.error) {
            const response = {
              response: false
            }
            reject(response)
          }
          else {
            if(title !== 'TestCaseDefault'){
              if (result.output.trim() == output) {
                const response = {
                  response: true
                }
                resolve(response)
              }
              else {
                const response = {
                  response: false
                }
                reject(response);
              }
            }else{
              if (result.output) {
                const response = {
                  response: true
                }
                resolve(response)
              }
            }
          }
        }
        else {
          reject(false);
        }
      });
    })
  }
  cancel(){
    this.dialogRef.close();
  }
  onSubmit(){
   const assignment = this.assignmentData._id;
   const owner = this.assignmentData.owner;
   const student = this.currentUser._id;
   const assignmentBody = this.code;
   const submissionDate = new Date();
   const submissionData = {assignment,owner,student,assignmentBody,submissionDate};
    this._assignmentService.createSubmission(submissionData).subscribe(data =>{
      console.log(data);
      this.dialogRef.close();
    })
  }
}
