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
  getAssignment(id):Observable<any>{
    return this.http.get(`${environment.url}assignment-operations/assignment/${id}`,{
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
}
