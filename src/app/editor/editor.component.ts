import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as ace from "ace-builds";
import { EditorService } from '../services/editor.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  output: string = "Your output will display here";
  constructor(private compileService: EditorService) { }
  aceEditor: any;
  stdin = new FormControl('');
  outputLoading:boolean =false;
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  language: any;
  theme: string;
  themes: string[] = ['dawn', 'github', 'eclipse', 'crimson_editor', 'terminal', 'textmate', 'vibrant_ink',]
  
  ngAfterViewInit() {
    this.setEditorConfig();
  }
  setEditorConfig(){
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
      this.compileService.compileCode(language, code, this.stdin.value).subscribe(result => {
        if (result) {
          if (result.errors) this.output = result.errors;
          else this.output = result.output;
          console.log(this.output);
          this.outputLoading = false;
        }
      });
    } else {
      alert("please select the language")
    }
  }
}
