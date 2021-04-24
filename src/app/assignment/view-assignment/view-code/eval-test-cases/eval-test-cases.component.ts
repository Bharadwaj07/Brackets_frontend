import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-eval-test-cases',
  templateUrl: './eval-test-cases.component.html',
  styleUrls: ['./eval-test-cases.component.css']
})
export class EvalTestCasesComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  code: string;
  language: string;
  testCaseResult: any[] = [];
  testCases: any[];
  assignmentData: any;
  constructor(
    public dialogRef: MatDialogRef<EvalTestCasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compileService: EditorService,
    private _assignmentService: AssignmentService,
  ) { }

  async ngOnInit() {
    this.code = this.data.code,
      this.language = this.data.language;
    this.assignmentData = this.data.assignmentData;
    if (this.data.testCases.length !== 0) {
      this.testCases = this.data.testCases;
    } else {
      this.testCases = [{
        title: "Test Case",
        inputs: "",
        outputs: ""
      }]
    }
    await this.runTestCase();
  }
  async runTestCase() {
    await Promise.all(
      this.testCases.map(async (testcase) => {
        this.compileTestCase(testcase.inputs, testcase.outputs).then((res: any) => {
          this.testCaseResult.push({ testcase, response: res.response })
        }).catch((err: any) => {
          this.testCaseResult.push({ testcase, response: err.response })
        })
      })
    );
  }
  compileTestCase(input, output) {
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
            if (input !== '') {
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
            } else {
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
  cancel() {
    this.dialogRef.close();
  }

}
