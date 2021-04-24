import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssignmentComponent } from './assignment/view-assignment/view-assignment.component';
import { ViewSubmissionComponent } from './assignment/view-assignment/view-submission/view-submission.component';
import { ViewClassComponent } from './class/view-class/view-class.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { RegisterComponent } from './register/register.component';
import { AuthGaurdService as AuthGaurd } from './services/auth/auth-gaurd.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGaurd] },
  {path:'discuss',component:DiscussionComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'class/:id', component: ViewClassComponent },
  { path: 'assignment', component: ViewAssignmentComponent},
  {path:'submission/:id',component:ViewSubmissionComponent},
  { path: 'editor/:id', component: EditorComponent },
  { path: "**", component: NotFound404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
