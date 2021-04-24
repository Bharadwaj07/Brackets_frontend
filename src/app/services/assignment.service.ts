import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }
  
  createAssignment(data):Observable<any>{
    return this.http.post(`${environment.url}assignment-operations/`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  modifyAssignment(id,data):Observable<any>{
    return this.http.put(`${environment.url}assignment-operations/${id}`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getAssignment(id):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/assignment/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  deleteAssignment(id):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getAllAssignment():Observable<any>{
    return this.http.get(`${environment.url}assignment-operations`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getTeachersAssignment(id):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getStudentsAssignment(studentId):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/student/${studentId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  
  getClassAssignments(classId):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/class/${classId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  createSubmission(data):Observable<any>{
    return this.http.post(`${environment.url}submission-operations/`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getAllSubmission(id):Observable<any>{
    return this.http.get(`${environment.url}submission-operations/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getStudentSubmission(assignment,student):Observable<any>{
    return this.http.get(`${environment.url}submission-operations/${assignment}/${student}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
}
