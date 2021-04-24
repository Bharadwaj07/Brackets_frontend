import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }

  evaluate(data):Observable<any>{
    return this.http.post(`${environment.url}evaluate/`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }

  getEvaluation(id):Observable<any>{
    return this.http.get(`${environment.url}evaluate/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getEvaluationForAssignment(studentId,assignmentId):Observable<any>{
    return this.http.get(`${environment.url}evaluate/${studentId}/${assignmentId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getEvaluationForStudent(studentId):Observable<any>{
    return this.http.get(`${environment.url}evaluate/student/assignment/${studentId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  listAllEvaluation():Observable<any>{
    return this.http.get(`${environment.url}evaluate/`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }

}
