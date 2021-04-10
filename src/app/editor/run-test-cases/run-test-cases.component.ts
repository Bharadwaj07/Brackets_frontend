import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-run-test-cases',
  templateUrl: './run-test-cases.component.html',
  styleUrls: ['./run-test-cases.component.css']
})
export class RunTestCasesComponent implements OnInit {
  code: string;
  language: string;
  testCaseResult: any[] = [];
  testCases: any[];
  constructor(public dialogRef: MatDialogRef<RunTestCasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private compileService: EditorService,) { }

  async ngOnInit() {
    this.code = this.data.code,
      this.language = this.data.language;
    this.testCases = this.data.testCases;
    await Promise.all(
      this.testCases.map(async (testcase) => {
        this.compileTestCase(testcase.inputs, testcase.outputs).then((res:any) =>{
          this.testCaseResult.push({testcase,response:res.response})
        }).catch((err:any)=>{
          this.testCaseResult.push({testcase,response:err.response})
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
              response:false
            }
            reject(response)
          }
          else {
            if (result.output.trim() == output) {
              const response = {
                response:true
              }
              resolve(response)
            }
            else {
              const response = {
                response:false
              }
              reject(response);
            }
          }
        }
        else {
          reject(false);
        }
      });
    })
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
