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
import { StandardsComponent } from './components/standards/standards.component';
import { KMStandardsComponent } from './components/KM-standards/KM-standards.component';
import { KEStandardsComponent } from './components/KE-standards/KE-standards.component';
import { G1MStandardsComponent } from './components/G1M-standards/G1M-standards.component';
import { G1EStandardsComponent } from './components/G1E-standards/G1E-standards.component';
import { G2MStandardsComponent } from './components/G2M-standards/G2M-standards.component';
import { G2EStandardsComponent } from './components/G2E-standards/G2E-standards.component';
import { G3MStandardsComponent } from './components/G3M-standards/G3M-standards.component';
import { G3EStandardsComponent } from './components/G3E-standards/G3E-standards.component';
import { G4MStandardsComponent } from './components/G4M-standards/G4M-standards.component';
import { G4EStandardsComponent } from './components/G4E-standards/G4E-standards.component';
import { G5MStandardsComponent } from './components/G5M-standards/G5M-standards.component';
import { G5EStandardsComponent } from './components/G5E-standards/G5E-standards.component';
import { G6MStandardsComponent } from './components/G6M-standards/G6M-standards.component';
import { G6EStandardsComponent } from './components/G6E-standards/G6E-standards.component';
import { G7MStandardsComponent } from './components/G7M-standards/G7M-standards.component';
import { G7EStandardsComponent } from './components/G7E-standards/G7E-standards.component';
import { G8MStandardsComponent } from './components/G8M-standards/G8M-standards.component';
import { G8EStandardsComponent } from './components/G8E-standards/G8E-standards.component';
import { HS1EStandardsComponent } from './components/HS1E-standards/HS1E-standards.component';
import { HS2EStandardsComponent } from './components/HS2E-standards/HS2E-standards.component';
import { HSMNQStandardsComponent } from './components/HSM-NQ-standards/HSM-NQ-standards.component';
import { HSMAStandardsComponent } from './components/HSM-A-standards/HSM-A-standards.component';
import { HSMFStandardsComponent } from './components/HSM-F-standards/HSM-F-standards.component';
import { HSMGStandardsComponent } from './components/HSM-G-standards/HSM-G-standards.component';
import { HSMSPStandardsComponent } from './components/HSM-SP-standards/HSM-SP-standards.component';
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
    StandardsComponent,
    KMStandardsComponent,
    KEStandardsComponent,
    G1MStandardsComponent,
    G1EStandardsComponent,
    G2MStandardsComponent,
    G2EStandardsComponent,
    G3MStandardsComponent,
    G3EStandardsComponent,
    G4MStandardsComponent,
    G4EStandardsComponent,
    G5MStandardsComponent,
    G5EStandardsComponent,
    G6MStandardsComponent,
    G6EStandardsComponent,
    G7MStandardsComponent,
    G7EStandardsComponent,
    G8MStandardsComponent,
    G8EStandardsComponent,
    HS1EStandardsComponent,
    HS2EStandardsComponent,    
    HSMNQStandardsComponent,
    HSMAStandardsComponent,
    HSMFStandardsComponent,
    HSMGStandardsComponent,
    HSMSPStandardsComponent,
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
