import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shell/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from './material.module';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorHeaderComponent } from './shell/editor-header/editor-header.component';
import { HomeHeaderComponent } from './shell/home-header/home-header.component';
import { TecherHomeComponent } from './home/techer-home/techer-home.component';
import { StudentHomeComponent } from './home/student-home/student-home.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { CreateClassDialogComponent } from './class/create-class-dialog/create-class-dialog.component';
import { CreateAssignmentDialogComponent } from './assignment/create-assignment-dialog/create-assignment-dialog.component';
import { AddNewStudentsDialogComponent, ViewClassComponent } from './class/view-class/view-class.component';
import { ViewAssignmentComponent } from './assignment/view-assignment/view-assignment.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditorComponent,
    EditorHeaderComponent,
    HomeHeaderComponent,
    TecherHomeComponent,
    StudentHomeComponent,
    NotFound404Component,
    CreateClassDialogComponent,
    CreateAssignmentDialogComponent,
    ViewClassComponent,
    ViewAssignmentComponent,
    AddNewStudentsDialogComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MatSidenavContainer],
  bootstrap: [AppComponent]
})
export class AppModule { }
