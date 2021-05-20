import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ViewCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private _classService:ClassService,
  ) { }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
