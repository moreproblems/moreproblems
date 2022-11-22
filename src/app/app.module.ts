import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import printJS from 'print-js';
// import * as fs from 'fs';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TX21G3MComponent } from './components/TX21G3M/TX21G3M.component';
import { TX21G3MKeyComponent } from './components/TX21G3M-key/TX21G3M-key.component';
import { TX19G3MComponent } from './components/TX19G3M/TX19G3M.component';
import { TX19G3MKeyComponent } from './components/TX19G3M-key/TX19G3M-key.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ProblemsComponent,
    AboutComponent,
    ContactComponent, 
    TX21G3MComponent,
    TX21G3MKeyComponent,
    TX19G3MComponent,
    TX19G3MKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgPipesModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    // printJS
    // fs
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
