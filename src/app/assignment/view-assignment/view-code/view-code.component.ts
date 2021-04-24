import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ace from "ace-builds";
import { EditorService } from 'src/app/services/editor.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { EvalTestCasesComponent } from './eval-test-cases/eval-test-cases.component';
@Component({
  selector: 'app-view-code',
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.css']
})
export class ViewCodeComponent implements OnInit,AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  constructor(
    public dialogRef: MatDialogRef<ViewCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb :FormBuilder,
    private _evaluate:EvaluationService,
    private _compile:EditorService,
    public dialog: MatDialog,
    ) { }
  aceEditor: any;
  code:string;
  assignement:any;
  evaluateForm:FormGroup;
  outputLoading:boolean =false;
  stdin = new FormControl('');
  output:string = "The output will display here";
  testCases: any[];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  language: any;
  isEvaluated:boolean= false;
  ngOnInit(): void {
    console.log(this.data)
    this.code=this.data.assignmentBody
    this.assignement = this.data.assignment;

    this.language = this.languages.find(lang => lang.id == this.assignement.language);
    this.evaluateForm = this.fb.group({
      assignment:[this.assignement._id],
      owner:[this.data.owner._id],
      student:[this.data.student._id],
      comment:[''],
      score:['',[Validators.maxLength(2),Validators.max(20),Validators.min(2)]]
    })
    this.getEvaluated();
  }
  getEvaluated(){
    this._evaluate.getEvaluationForAssignment(this.data.student._id,this.assignement._id).subscribe(data =>{
      if(data){
        this.isEvaluated = true;
      }
    })
  }
  ngAfterViewInit() {
    this.setEditorConfig();
  }
  setEditorConfig() {
    ace.config.set("fontSize", "12px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setOptions({
      fontSize: "12pt",
      readOnly: true,
    });
    this.aceEditor.setTheme("ace/theme/vibrant_ink");
    this.aceEditor.setValue(this.code,1);
  }
  runCode() {
    if (this.language) {
      this.outputLoading = true;
      const language = this.language.id;
      const code = this.aceEditor.getValue();
      if (code !== '') {
        this._compile.compileCode(language, code, this.stdin.value).subscribe(result => {
          if (result) {
            if (result.errors) this.output = result.errors;
            else this.output = result.output;
            console.log(this.output);
            this.outputLoading = false;
          }
        });
      } else {
        this.outputLoading = false;
        alert('Empty Code !!');
      }
    } else {
      this.outputLoading = false;
      alert("please select the language")
    }
  }
  
  runTestCases() {
    const code = this.aceEditor.getValue()
    const language = this.language.id;
    const testCases = this.assignement.testCases;
    const assignmentData = this.assignement;
    if(this.language){
      if (code !== '') {
        const dialogRef = this.dialog.open(EvalTestCasesComponent, {
          width: '250px',
          data: {code,language,testCases,assignmentData},
          disableClose: true
        });
  
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }else{
        alert('Empty Code !!');
      }
    }else{
      alert("please select the language")
    }

  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    if(this.evaluateForm.valid){
      this._evaluate.evaluate(this.evaluateForm.value).subscribe(data =>{
        console.log(data);
        this.dialogRef.close();
      })
    }else{
      console.log(this.evaluateForm.errors)
    }
  }
  
}
