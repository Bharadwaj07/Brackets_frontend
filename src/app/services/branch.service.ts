import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }

  createBranch(data):Observable<any>{
    return this.http.post(`${environment.url}branch/`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  modifyBranch(id,data):Observable<any>{
    return this.http.patch(`${environment.url}branch/${id}`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  deleteBranch(id):Observable<any>{
    return this.http.delete(`${environment.url}branch/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }

  getBranchForTeacher(id):Observable<any>{
    return this.http.get(`${environment.url}branch/${id}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  getAllBranch():Observable<any>{
    return this.http.delete(`${environment.url}branch/`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
}
