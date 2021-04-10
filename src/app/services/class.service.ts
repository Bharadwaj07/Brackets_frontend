import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }

  getAllStudents():Observable<any>{
    return this.http.get<any>(`${environment.url}user-operations/STUDENT`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  getAllTeachers():Observable<any>{
    return this.http.get<any>(`${environment.url}user-operations/TEACHER`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  listAllClass():Observable<any>{
    return this.http.get<any>(`${environment.url}team-operations/`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  createClass(data):Observable<any>{
    return this.http.post(`${environment.url}team-operations`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  getClassCode():Observable<any>{
    return this.http.get<any>(`${environment.url}team-operations/uuid`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  getStudentsClass(studentId):Observable<any>{
    return this.http.get(`${environment.url}team-operations/student/${studentId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  modifyClass(data,id):Observable<any>{
    return this.http.put(`${environment.url}team-operations/${id}`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getClassStudents(id):Observable<any>{
    return this.http.get(`${environment.url}team-operations/team/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  getAllClass(ownerId):Observable<any>{
    return this.http.get(`${environment.url}team-operations/${ownerId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  joinClass(teamCode,userid):Observable<any>{
    return this.http.put(`${environment.url}team-operations/class/${userid}/`,{teamCode},{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
}
