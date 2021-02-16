import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,private userService:LoginService,private router:Router ) { }

  ngOnInit(): void {
   this.logInForm = this.fb.group({
     email:['',[Validators.required,Validators.email]],
     password:[''],
   });

  }
  get form(){return this.logInForm.controls}
  onSubmit(){
    if(this.logInForm.valid){
      this.userService.loginUser(this.logInForm.value).subscribe((data) =>{
        const {token} = data;
        localStorage.setItem('authToken',token);
        // console.log(localStorage.getItem('auth'))
        this.router.navigate(['home']);
      } )
    }
  }

}
