import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EditorService {
  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }

  compileCode(language,code,stdin):Observable<any>{
    const data ={
      language,code,stdin
    }
    return this.http.post(`${environment.url}compile`,data,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
}
