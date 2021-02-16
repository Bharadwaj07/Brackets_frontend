import { Injectable } from '@angular/core';
import {User} from './models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  root_url = environment.url;
  constructor(private http:HttpClient) { }

  registerUser(userdata:User):Observable<User>{
    return this.http.post<User>(`${this.root_url}user-operations`,userdata);
  }

  loginUser(userdata:any):Observable<any>{
    return this.http.post<any>(`${this.root_url}user-operations/login`,userdata);
  }
}
