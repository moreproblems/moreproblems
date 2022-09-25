import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import * as fs from 'fs';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TX21G3MComponent } from './components/TX21G3M/TX21G3M.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ProblemsComponent,
    AboutComponent,
    ContactComponent,
    TX21G3MComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // fs
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
