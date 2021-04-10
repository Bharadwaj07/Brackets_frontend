import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as ace from "ace-builds";
import { AssignmentService } from '../services/assignment.service';
import { EditorService } from '../services/editor.service';
import { RunTestCasesComponent } from './run-test-cases/run-test-cases.component';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  output: string = "Your output will display here";
  assignement: any;
  inputSamples: string;
  outputSamples: string;
  testCases: any[];
  constructor(
    private compileService: EditorService,
    private router: ActivatedRoute,
    private assignmentService: AssignmentService,
    public dialog: MatDialog
  ) { }
  aceEditor: any;
  stdin = new FormControl('');
  outputLoading: boolean = false;
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  language: any;
  theme: string;
  themes: string[] = ['dawn', 'github', 'eclipse', 'crimson_editor', 'terminal', 'textmate', 'vibrant_ink',]
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getAssignemtDetails(id);
    });
  }
  getAssignemtDetails(id) {
    this.assignmentService.getAssignment(id).subscribe(data => {
      console.log(data);
      this.assignement = data;
      this.inputSamples = data.inputSample ? data.inputSample : undefined;
      this.outputSamples = data.outputSample ? data.outputSample : undefined;
      this.testCases = data.testCases ? data.testCases : undefined;
      this.language = this.languages.find(lang => lang.id == data.language);
      this.setMode(this.language);
    });
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
      fontSize: "12pt"
    });
    this.aceEditor.setTheme("ace/theme/dawn");
    this.aceEditor.session.setMode("ace/mode/c_cpp");
  }
  setMode(language) {
    this.language = language;
    this.aceEditor.session.setMode(`ace/mode/${language.mode}`);
  }
  setTheme(theme) {
    this.theme = theme;
    this.aceEditor.setTheme(`ace/theme/${theme}`);
  }
  runCode() {
    if (this.language) {
      this.outputLoading = true;
      const language = this.language.id;
      const code = this.aceEditor.getValue();
      if (code !== '') {
        this.compileService.compileCode(language, code, this.stdin.value).subscribe(result => {
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
    const testCases = this.testCases
    if(this.language){
      if (code !== '') {
        const dialogRef = this.dialog.open(RunTestCasesComponent, {
          width: '250px',
          data: {code,language,testCases},
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
}
