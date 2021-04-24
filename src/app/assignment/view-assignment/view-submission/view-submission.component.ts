import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { ViewCodeComponent } from '../view-code/view-code.component';
@Component({
  selector: 'app-view-submission',
  templateUrl: './view-submission.component.html',
  styleUrls: ['./view-submission.component.css']
})
export class ViewSubmissionComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  dataSource: MatTableDataSource<any>;
  evaluationData:any[];
  displayedColumns: string[] = ["assignement_title", "language","submitted_by", "submission_date",'action'];
  languages: any[] = [
    { language: 'Python', id: 0, mode: 'python' },
    { language: 'Java Script', id: 1, mode: 'javascript' },
    { language: 'C/C++', id: 2, mode: 'c_cpp' },
    { language: 'Go', id: 3, mode: 'golang' },
  ]
  constructor( 
    private route: ActivatedRoute,
    private _assignmentService: AssignmentService,
    public dialog: MatDialog,
    private _evaluate :EvaluationService,
    ) { }

  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe(params =>{
      id = params.get('id');
      this.getSubmissionData(id);
      this.getEvaluationData(id);
    });
    
  }
  getSubmissionData(id){
    this._assignmentService.getAllSubmission(id).subscribe(data =>{
      this.dataSource = data;
    })
  }
  getEvaluationData(id){
    this._evaluate.getEvaluation(id).subscribe(data =>{
      console.log(data)
      this.evaluationData = data;
    })
  }
  isEvaluated(studentId){
    return this.evaluationData.find(doc => doc.student === studentId)
  }
  getLanguage(id){
    const lang =this.languages.find(l => l.id ==id);
    return lang.language;
  }
  view(element): void {
    const dialogRef = this.dialog.open(ViewCodeComponent, {
      width: '100vw',
      height:'100vw',
      maxWidth:'100vw',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
