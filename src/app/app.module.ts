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
import { KMStandardsComponent } from './components/KM-standards/KM-standards.component';
import { G1MStandardsComponent } from './components/G1M-standards/G1M-standards.component';
import { G2MStandardsComponent } from './components/G2M-standards/G2M-standards.component';
import { G3MStandardsComponent } from './components/G3M-standards/G3M-standards.component';
import { G4MStandardsComponent } from './components/G4M-standards/G4M-standards.component';
import { G5MStandardsComponent } from './components/G5M-standards/G5M-standards.component';
import { G6MStandardsComponent } from './components/G6M-standards/G6M-standards.component';
import { G7MStandardsComponent } from './components/G7M-standards/G7M-standards.component';
import { G8MStandardsComponent } from './components/G8M-standards/G8M-standards.component';
import { HSNQStandardsComponent } from './components/HS-NQ-standards/HS-NQ-standards.component';
import { HSAStandardsComponent } from './components/HS-A-standards/HS-A-standards.component';
import { HSFStandardsComponent } from './components/HS-F-standards/HS-F-standards.component';
import { HSMStandardsComponent } from './components/HS-M-standards/HS-M-standards.component';
import { HSGStandardsComponent } from './components/HS-G-standards/HS-G-standards.component';
import { HSSPStandardsComponent } from './components/HS-SP-standards/HS-SP-standards.component';
import { TX21G3MExamComponent } from './components/TX21G3M-exam/TX21G3M-exam.component';
import { TX21G3MKeyComponent } from './components/TX21G3M-key/TX21G3M-key.component';
import { TX19G3MExamComponent } from './components/TX19G3M-exam/TX19G3M-exam.component';
import { TX19G3MKeyComponent } from './components/TX19G3M-key/TX19G3M-key.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ProblemsComponent,
    AboutComponent,
    ContactComponent,
    KMStandardsComponent,
    G1MStandardsComponent,
    G2MStandardsComponent,
    G3MStandardsComponent,
    G4MStandardsComponent,
    G5MStandardsComponent,
    G6MStandardsComponent,
    G7MStandardsComponent,
    G8MStandardsComponent,
    HSNQStandardsComponent,
    HSAStandardsComponent,
    HSFStandardsComponent,
    HSMStandardsComponent,
    HSGStandardsComponent,
    HSSPStandardsComponent,
    TX21G3MExamComponent,
    TX21G3MKeyComponent,
    TX19G3MExamComponent,
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
