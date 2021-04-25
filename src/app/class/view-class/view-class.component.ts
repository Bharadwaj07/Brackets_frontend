import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { BranchComponent } from '../branch/branch.component';
import { BranchService } from 'src/app/services/branch.service';
@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  classList: any[];
  allStudent: any[];
  branchList: any[];
  constructor(
    private _classService: ClassService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _assignmentService: AssignmentService,
    private _branchService: BranchService
  ) { }
  studentList: any[];
  classData: any;
  classAssignment: any[];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe(params => {
      id = params.get('id');
    })
    this._classService.getClassStudents(id).subscribe(data => {
      console.log(data);
      this.classData = data;
      this.studentList = data.students;
    });
    this._classService.getAllStudents().subscribe(data => {
      this.allStudent = data;
    });
    this._assignmentService.getClassAssignments(id).subscribe(data => {
      this.classAssignment = data;
    });
    this._branchService.getBranchForTeacher(id).subscribe(data => {
      console.log(data)
      this.branchList = data;
    })
  }
  addStudent(student) {
    this.classData.students.push(student);
  }
  deleteStudent(student) {
    this.classData = this.classData.students.filter(ele => ele._id !== student._id);
    this._classService.modifyClass(this.classData, this.classData._id).subscribe(data => {
      this.ngOnInit();
    })
  }
  // dissableCode(classId){

  // }


  createBranch(): void {
    const addBranch = {
      classStudents: this.studentList, classData: this.classData
    }
    const dialogRef = this.dialog.open(BranchComponent, {
      width: '300px',
      data: { addBranch}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }
  deleteBranch(id) {
    this._branchService.deleteBranch(id).subscribe(data => {
      this.ngOnInit()
    })
  }
  editBranch(branchData) {
    const editBranch ={
      ...branchData,
      classStudents: this.studentList
    }
    const dialogRef = this.dialog.open(BranchComponent, {
      width: '300px',
      data: { editBranch }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }
  getLanguage(languageId) {
    const index = this.languages.findIndex(ele => ele.id == languageId);
    return this.languages[index].language;
  }
}


@Component({
  selector: 'add-new-students-dialog',
  templateUrl: 'add-new-students-dialog.html',
})
export class AddNewStudentsDialogComponent implements OnInit {
  addedStudents: any[];
  studentsToAdd: any[];
  selectedItems: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddNewStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _classService: ClassService,
  ) { }
  ngOnInit() {
    let result = [];
    this.addedStudents = this.data.allStudents
    this.data.allStudents.filter(ele => {
      this.data.classStudents.findIndex(doc => doc._id === ele._id) == -1 ? result.push(ele) : null
    });
    this.studentsToAdd = result;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStudents(lists) {
    this.selectedItems = lists.selectedOptions.selected.map(item => item.value)
    const { classData, classStudents } = this.data;
    let students = [];
    classStudents.forEach(element => {
      students.push(element._id);
    });
    classData.students = [...students, ...this.selectedItems]
    this._classService.modifyClass(classData, classData._id).subscribe(data => {
      this.dialogRef.close();
    })
  }

}