import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('authToken');
  constructor(private http:HttpClient) { }

  getAllUser():Observable<any>{
    return this.http.get<any>(`${environment.url}user-operations/`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  modifyUser(id,userType):Observable<any>{
    return this.http.patch<any>(`${environment.url}user-operations/${id}`,{userType},{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
}
