import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {MustMatch} from '../../helpers/mustMatch';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  roles:string[] = ["TEACHER","STUDENT"];
  submitted:boolean= false
  isStudent:boolean = false;
  constructor(private fb:FormBuilder,private userService:LoginService,private router:Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      srn:['',[Validators.maxLength(13),Validators.minLength(13)]],
      userType:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get form(){return this.registerForm.controls}

  change(event){
    if(event.value == 'STUDENT'){
      this.isStudent = true;
    }else{
      this.isStudent = false;
    }
  }

  onSubmit(){
    if(this.registerForm.valid){
      const userData = {
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        userType:this.registerForm.value.userType,
        password:this.registerForm.value.password,
      }
      this.userService.registerUser(userData).subscribe((data) =>{
        
          if(data.success){
            //
          }else{
            this._snackBar.open("Email already in use","Invalid credential",{
              duration:2000,
            })
          }
      })
    }
  }
}
