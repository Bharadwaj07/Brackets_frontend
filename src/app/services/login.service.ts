import { Injectable } from '@angular/core';
import {User} from './models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
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
    return this.http.post<any>(`${this.root_url}user-operations/login`,userdata)
                    .pipe(
                      tap((response :any) => {
                        if(response){
                          if(response.success ===true){
                            localStorage.setItem('authToken',response.token);
                          }else{
                            console.log("error response:",response);
                          }
                        }else{
                          console.log("Error");
                        }
                      })
                    )
  }
}
