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
