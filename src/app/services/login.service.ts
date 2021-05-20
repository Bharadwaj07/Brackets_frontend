import { Injectable } from '@angular/core';
import {User} from './models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  root_url = environment.url;
  constructor(private http:HttpClient,private router:Router) { }

  registerUser(userdata:User):Observable<any>{
    return this.http.post<any>(`${this.root_url}user-operations`,userdata)
                    .pipe(
                      tap((response :any) => {
                        if(response){
                          if(response.success ===true){
                            this.router.navigate(['login'])
                            // localStorage.setItem('authToken',response.token);
                          }else{
                            console.log("error response:",response);
                          }
                        }else{
                          console.log("Error");
                        }
                      })
                    )
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
