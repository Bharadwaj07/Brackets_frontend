import { Component, OnInit,ElementRef,ViewChild,AfterViewInit} from '@angular/core';
import * as ace from "ace-builds";
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  constructor() { }

  // ngOnInit(): void {
  // }
  ngAfterViewInit(){
      ace.config.set("fontSize", "12px");
      ace.config.set(
        "basePath",
        "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
      );
      const aceEditor = ace.edit(this.editor.nativeElement);
      aceEditor.setTheme("ace/theme/xcode");
      aceEditor.session.setMode("ace/mode/javascript");
      aceEditor.on("change", () => {
        console.log(aceEditor.getValue());
      });
  }
}
