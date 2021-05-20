import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,
      private userService:LoginService,
      private router:Router,
      private auth :AuthService,
      private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
   this.logInForm = this.fb.group({
     email:['',[Validators.required,Validators.email]],
     password:['',Validators.required],
   });

  }
  get form(){return this.logInForm.controls}
  onSubmit(){
    if(this.logInForm.valid){
      this.userService.loginUser(this.logInForm.value).subscribe((data) =>{
        if(data.success){
          if(this.auth.isAuthenticated()){
            this.router.navigate(['home']);
          }else{
            console.log("invalid cred");
          }
        }else{
          this._snackBar.open(data.message,"Invalid",{
            duration:2000,
          })
        }
      },(err:any) =>{
        console.log(err)
      })
    }
  }

}
