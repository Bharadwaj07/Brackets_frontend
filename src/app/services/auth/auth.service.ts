import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isAuthenticated():boolean{
    const token  = localStorage.getItem('authToken');
    if(typeof token === "undefined" || token === "null"){
      return false;
    }else{
      // console.log(token)
      const decodeToken:object = jwt_decode(token);
      // console.log(decodeToken)
      if(!decodeToken){
        console.log("invalid user");
        return false;
      }else{
        // console.log("valid user",decodeToken);
        localStorage.setItem('currentUser',JSON.stringify(decodeToken));
        return true;
      }
    }
  }
}
