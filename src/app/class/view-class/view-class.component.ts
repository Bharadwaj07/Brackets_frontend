import { Component, OnInit,Inject, ViewChildren, QueryList} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  classList:any[];
  allStudent:any[];
  constructor(private _classService:ClassService,private route:ActivatedRoute,
    public dialog: MatDialog) { }
  studentList:any[];
  classData :any;
  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe(params =>{
      id = params.get('id');
    })
    this._classService.getClassStudents(id).subscribe(data =>{
      this.classData = data;
      this.studentList = data.students;
    });
    this._classService.getAllStudents().subscribe(data =>{
      this.allStudent = data;
    });
  }
  addStudent(student){
    this.classData.students.push(student);
  } 
  deleteStudent(student){
    this.classData = this.classData.students.filter(ele => ele._id !==student._id);
    this._classService.modifyClass(this.classData,this.classData._id).subscribe(data =>{
      console.log(data);
      this.ngOnInit();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewStudentsDialogComponent, {
      width: '250px',
      data: {allStudents:this.allStudent,classStudents:this.studentList,classData:this.classData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'add-new-students-dialog',
  templateUrl: 'add-new-students-dialog.html',
})
export class AddNewStudentsDialogComponent implements OnInit{
  addedStudents:any[];
  studentsToAdd:any[];
  selectedItems:any[] =[];
  
  constructor(
    public dialogRef: MatDialogRef<AddNewStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _classService:ClassService,
    ) {}
    ngOnInit(){
      let result =[];
      this.addedStudents = this.data.allStudents
       this.data.allStudents.filter(ele =>{
         this.data.classStudents.findIndex(doc => doc._id === ele._id) == -1 ? result.push(ele) : null
       });
       this.studentsToAdd = result;

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStudents(lists){
   this.selectedItems = lists.selectedOptions.selected.map(item =>item.value)
   const {classData,classStudents} = this.data;
   let students =[];
    classStudents.forEach(element => {
      students.push(element._id);
    });
    classData.students = [...students,...this.selectedItems]
   this._classService.modifyClass(classData,classData._id).subscribe(data =>{
    this.dialogRef.close();
   })
  }
  
}