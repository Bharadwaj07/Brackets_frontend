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
import { JoinClassComponent, StudentHomeComponent } from './home/student-home/student-home.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { CreateClassDialogComponent } from './class/create-class-dialog/create-class-dialog.component';
import { CreateAssignmentDialogComponent } from './assignment/create-assignment-dialog/create-assignment-dialog.component';
import { AddNewStudentsDialogComponent, ViewClassComponent } from './class/view-class/view-class.component';
import { ViewAssignmentComponent } from './assignment/view-assignment/view-assignment.component';
import { TestCasesComponent } from './assignment/create-assignment-dialog/test-cases/test-cases.component';
import { AdminComponent, EditUserTypeDialog } from './home/admin/admin.component';
import { AdminHeaderComponent } from './shell/admin-header/admin-header.component';
import { RunTestCasesComponent } from './editor/run-test-cases/run-test-cases.component';
import { ViewCodeComponent } from './assignment/view-assignment/view-code/view-code.component';
import { ViewSubmissionComponent } from './assignment/view-assignment/view-submission/view-submission.component';
import { EditDialogComponent } from './assignment/edit-dialog/edit-dialog.component';
import { EvalTestCasesComponent } from './assignment/view-assignment/view-code/eval-test-cases/eval-test-cases.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { MessagesComponent } from './discussion/messages/messages.component';
import { BranchComponent } from './class/branch/branch.component';
import { ViewCommentsComponent } from './home/student-home/view-comments/view-comments.component';



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
    TestCasesComponent,
    AdminComponent,
    AdminHeaderComponent,
    EditUserTypeDialog,
    JoinClassComponent,
    RunTestCasesComponent,
    ViewCodeComponent,
    ViewSubmissionComponent,
    EditDialogComponent,
    EvalTestCasesComponent,
    DiscussionComponent,
    MessagesComponent,
    BranchComponent,
    ViewCommentsComponent,
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
