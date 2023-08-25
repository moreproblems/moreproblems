import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import printJS from 'print-js';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgOtpInputModule } from  'ng-otp-input';
import { environment } from "src/environments/environment";
// import * as fs from 'fs';

import { AuthService } from "./shared/services/auth.service";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
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
import { TestExamComponent } from './components/test-exam/test-exam.component';
import { PA22G3MExamComponent } from './components/PA22G3M-exam/PA22G3M-exam.component';
import { PA22G3MKeyComponent } from './components/PA22G3M-key/PA22G3M-key.component';
import { PA21G3MExamComponent } from './components/PA21G3M-exam/PA21G3M-exam.component';
import { PA21G3MKeyComponent } from './components/PA21G3M-key/PA21G3M-key.component';
import { PA19G3MExamComponent } from './components/PA19G3M-exam/PA19G3M-exam.component';
import { PA19G3MKeyComponent } from './components/PA19G3M-key/PA19G3M-key.component';
import { PA18G3MExamComponent } from './components/PA18G3M-exam/PA18G3M-exam.component';
import { PA18G3MKeyComponent } from './components/PA18G3M-key/PA18G3M-key.component';
import { PA16G3MExamComponent } from './components/PA16G3M-exam/PA16G3M-exam.component';
import { PA16G3MKeyComponent } from './components/PA16G3M-key/PA16G3M-key.component';
import { PA15G3MExamComponent } from './components/PA15G3M-exam/PA15G3M-exam.component';
import { PA15G3MKeyComponent } from './components/PA15G3M-key/PA15G3M-key.component';
import { PA22G4MExamComponent } from './components/PA22G4M-exam/PA22G4M-exam.component';
import { PA22G4MKeyComponent } from './components/PA22G4M-key/PA22G4M-key.component';
import { PA21G4MExamComponent } from './components/PA21G4M-exam/PA21G4M-exam.component';
import { PA21G4MKeyComponent } from './components/PA21G4M-key/PA21G4M-key.component';
import { PA19G4MExamComponent } from './components/PA19G4M-exam/PA19G4M-exam.component';
import { PA19G4MKeyComponent } from './components/PA19G4M-key/PA19G4M-key.component';
import { PA18G4MExamComponent } from './components/PA18G4M-exam/PA18G4M-exam.component';
import { PA18G4MKeyComponent } from './components/PA18G4M-key/PA18G4M-key.component';
import { PA16G4MExamComponent } from './components/PA16G4M-exam/PA16G4M-exam.component';
import { PA16G4MKeyComponent } from './components/PA16G4M-key/PA16G4M-key.component';
import { PA15G4MExamComponent } from './components/PA15G4M-exam/PA15G4M-exam.component';
import { PA15G4MKeyComponent } from './components/PA15G4M-key/PA15G4M-key.component';
import { PA22G4SExamComponent } from './components/PA22G4S-exam/PA22G4S-exam.component';
import { PA22G4SKeyComponent } from './components/PA22G4S-key/PA22G4S-key.component';
import { PA21G4SExamComponent } from './components/PA21G4S-exam/PA21G4S-exam.component';
import { PA21G4SKeyComponent } from './components/PA21G4S-key/PA21G4S-key.component';
import { PA19G4SExamComponent } from './components/PA19G4S-exam/PA19G4S-exam.component';
import { PA19G4SKeyComponent } from './components/PA19G4S-key/PA19G4S-key.component';
import { PA18G4SExamComponent } from './components/PA18G4S-exam/PA18G4S-exam.component';
import { PA18G4SKeyComponent } from './components/PA18G4S-key/PA18G4S-key.component';
import { PA16G4SExamComponent } from './components/PA16G4S-exam/PA16G4S-exam.component';
import { PA16G4SKeyComponent } from './components/PA16G4S-key/PA16G4S-key.component';
import { PA15G4SExamComponent } from './components/PA15G4S-exam/PA15G4S-exam.component';
import { PA15G4SKeyComponent } from './components/PA15G4S-key/PA15G4S-key.component';
import { PA22G5MExamComponent } from './components/PA22G5M-exam/PA22G5M-exam.component';
import { PA22G5MKeyComponent } from './components/PA22G5M-key/PA22G5M-key.component';
import { PA21G5MExamComponent } from './components/PA21G5M-exam/PA21G5M-exam.component';
import { PA21G5MKeyComponent } from './components/PA21G5M-key/PA21G5M-key.component';
import { PA19G5MExamComponent } from './components/PA19G5M-exam/PA19G5M-exam.component';
import { PA19G5MKeyComponent } from './components/PA19G5M-key/PA19G5M-key.component';
import { PA18G5MExamComponent } from './components/PA18G5M-exam/PA18G5M-exam.component';
import { PA18G5MKeyComponent } from './components/PA18G5M-key/PA18G5M-key.component';
import { PA16G5MExamComponent } from './components/PA16G5M-exam/PA16G5M-exam.component';
import { PA16G5MKeyComponent } from './components/PA16G5M-key/PA16G5M-key.component';
import { PA15G5MExamComponent } from './components/PA15G5M-exam/PA15G5M-exam.component';
import { PA15G5MKeyComponent } from './components/PA15G5M-key/PA15G5M-key.component';
import { PA22G6MExamComponent } from './components/PA22G6M-exam/PA22G6M-exam.component';
import { PA22G6MKeyComponent } from './components/PA22G6M-key/PA22G6M-key.component';
import { PA21G6MExamComponent } from './components/PA21G6M-exam/PA21G6M-exam.component';
import { PA21G6MKeyComponent } from './components/PA21G6M-key/PA21G6M-key.component';
import { PA19G6MExamComponent } from './components/PA19G6M-exam/PA19G6M-exam.component';
import { PA19G6MKeyComponent } from './components/PA19G6M-key/PA19G6M-key.component';
import { PA18G6MExamComponent } from './components/PA18G6M-exam/PA18G6M-exam.component';
import { PA18G6MKeyComponent } from './components/PA18G6M-key/PA18G6M-key.component';
import { PA16G6MExamComponent } from './components/PA16G6M-exam/PA16G6M-exam.component';
import { PA16G6MKeyComponent } from './components/PA16G6M-key/PA16G6M-key.component';
import { PA15G6MExamComponent } from './components/PA15G6M-exam/PA15G6M-exam.component';
import { PA15G6MKeyComponent } from './components/PA15G6M-key/PA15G6M-key.component';
import { TX22G3MExamComponent } from './components/TX22G3M-exam/TX22G3M-exam.component';
import { TX22G3MKeyComponent } from './components/TX22G3M-key/TX22G3M-key.component';
import { TX21G3MExamComponent } from './components/TX21G3M-exam/TX21G3M-exam.component';
import { TX21G3MKeyComponent } from './components/TX21G3M-key/TX21G3M-key.component';
import { TX19G3MExamComponent } from './components/TX19G3M-exam/TX19G3M-exam.component';
import { TX19G3MKeyComponent } from './components/TX19G3M-key/TX19G3M-key.component';
import { TX18G3MExamComponent } from './components/TX18G3M-exam/TX18G3M-exam.component';
import { TX18G3MKeyComponent } from './components/TX18G3M-key/TX18G3M-key.component';
import { TX17G3MExamComponent } from './components/TX17G3M-exam/TX17G3M-exam.component';
import { TX17G3MKeyComponent } from './components/TX17G3M-key/TX17G3M-key.component';
import { TX22G4MExamComponent } from './components/TX22G4M-exam/TX22G4M-exam.component';
import { TX22G4MKeyComponent } from './components/TX22G4M-key/TX22G4M-key.component';
import { TX21G4MExamComponent } from './components/TX21G4M-exam/TX21G4M-exam.component';
import { TX21G4MKeyComponent } from './components/TX21G4M-key/TX21G4M-key.component';
import { TX19G4MExamComponent } from './components/TX19G4M-exam/TX19G4M-exam.component';
import { TX19G4MKeyComponent } from './components/TX19G4M-key/TX19G4M-key.component';
import { TX18G4MExamComponent } from './components/TX18G4M-exam/TX18G4M-exam.component';
import { TX18G4MKeyComponent } from './components/TX18G4M-key/TX18G4M-key.component';
import { TX17G4MExamComponent } from './components/TX17G4M-exam/TX17G4M-exam.component';
import { TX17G4MKeyComponent } from './components/TX17G4M-key/TX17G4M-key.component';
import { TX22G5MExamComponent } from './components/TX22G5M-exam/TX22G5M-exam.component';
import { TX22G5MKeyComponent } from './components/TX22G5M-key/TX22G5M-key.component';
import { TX21G5MExamComponent } from './components/TX21G5M-exam/TX21G5M-exam.component';
import { TX21G5MKeyComponent } from './components/TX21G5M-key/TX21G5M-key.component';
import { TX19G5MExamComponent } from './components/TX19G5M-exam/TX19G5M-exam.component';
import { TX19G5MKeyComponent } from './components/TX19G5M-key/TX19G5M-key.component';
import { TX18G5MExamComponent } from './components/TX18G5M-exam/TX18G5M-exam.component';
import { TX18G5MKeyComponent } from './components/TX18G5M-key/TX18G5M-key.component';
import { TX17G5MExamComponent } from './components/TX17G5M-exam/TX17G5M-exam.component';
import { TX17G5MKeyComponent } from './components/TX17G5M-key/TX17G5M-key.component';
import { TX22G5SExamComponent } from './components/TX22G5S-exam/TX22G5S-exam.component';
import { TX22G5SKeyComponent } from './components/TX22G5S-key/TX22G5S-key.component';
import { TX21G5SExamComponent } from './components/TX21G5S-exam/TX21G5S-exam.component';
import { TX21G5SKeyComponent } from './components/TX21G5S-key/TX21G5S-key.component';
import { TX19G5SExamComponent } from './components/TX19G5S-exam/TX19G5S-exam.component';
import { TX19G5SKeyComponent } from './components/TX19G5S-key/TX19G5S-key.component';
import { TX18G5SExamComponent } from './components/TX18G5S-exam/TX18G5S-exam.component';
import { TX18G5SKeyComponent } from './components/TX18G5S-key/TX18G5S-key.component';
import { TX22G6MExamComponent } from './components/TX22G6M-exam/TX22G6M-exam.component';
import { TX22G6MKeyComponent } from './components/TX22G6M-key/TX22G6M-key.component';
import { TX21G6MExamComponent } from './components/TX21G6M-exam/TX21G6M-exam.component';
import { TX21G6MKeyComponent } from './components/TX21G6M-key/TX21G6M-key.component';
import { TX19G6MExamComponent } from './components/TX19G6M-exam/TX19G6M-exam.component';
import { TX19G6MKeyComponent } from './components/TX19G6M-key/TX19G6M-key.component';
import { TX18G6MExamComponent } from './components/TX18G6M-exam/TX18G6M-exam.component';
import { TX18G6MKeyComponent } from './components/TX18G6M-key/TX18G6M-key.component';
import { TX17G6MExamComponent } from './components/TX17G6M-exam/TX17G6M-exam.component';
import { TX17G6MKeyComponent } from './components/TX17G6M-key/TX17G6M-key.component';
import { TX22G7MExamComponent } from './components/TX22G7M-exam/TX22G7M-exam.component';
import { TX22G7MKeyComponent } from './components/TX22G7M-key/TX22G7M-key.component';
import { TX21G7MExamComponent } from './components/TX21G7M-exam/TX21G7M-exam.component';
import { TX21G7MKeyComponent } from './components/TX21G7M-key/TX21G7M-key.component';
import { TX19G7MExamComponent } from './components/TX19G7M-exam/TX19G7M-exam.component';
import { TX19G7MKeyComponent } from './components/TX19G7M-key/TX19G7M-key.component';
import { TX18G7MExamComponent } from './components/TX18G7M-exam/TX18G7M-exam.component';
import { TX18G7MKeyComponent } from './components/TX18G7M-key/TX18G7M-key.component';
import { TX17G7MExamComponent } from './components/TX17G7M-exam/TX17G7M-exam.component';
import { TX17G7MKeyComponent } from './components/TX17G7M-key/TX17G7M-key.component';
import { TX22G8MExamComponent } from './components/TX22G8M-exam/TX22G8M-exam.component';
import { TX22G8MKeyComponent } from './components/TX22G8M-key/TX22G8M-key.component';
import { TX21G8MExamComponent } from './components/TX21G8M-exam/TX21G8M-exam.component';
import { TX21G8MKeyComponent } from './components/TX21G8M-key/TX21G8M-key.component';
import { TX19G8MExamComponent } from './components/TX19G8M-exam/TX19G8M-exam.component';
import { TX19G8MKeyComponent } from './components/TX19G8M-key/TX19G8M-key.component';
import { TX18G8MExamComponent } from './components/TX18G8M-exam/TX18G8M-exam.component';
import { TX18G8MKeyComponent } from './components/TX18G8M-key/TX18G8M-key.component';
import { TX17G8MExamComponent } from './components/TX17G8M-exam/TX17G8M-exam.component';
import { TX17G8MKeyComponent } from './components/TX17G8M-key/TX17G8M-key.component';
import { TX22G8SExamComponent } from './components/TX22G8S-exam/TX22G8S-exam.component';
import { TX22G8SKeyComponent } from './components/TX22G8S-key/TX22G8S-key.component';
import { TX21G8SExamComponent } from './components/TX21G8S-exam/TX21G8S-exam.component';
import { TX21G8SKeyComponent } from './components/TX21G8S-key/TX21G8S-key.component';
import { TX19G8SExamComponent } from './components/TX19G8S-exam/TX19G8S-exam.component';
import { TX19G8SKeyComponent } from './components/TX19G8S-key/TX19G8S-key.component';
import { TX18G8SExamComponent } from './components/TX18G8S-exam/TX18G8S-exam.component';
import { TX18G8SKeyComponent } from './components/TX18G8S-key/TX18G8S-key.component';
import { TX22G8SSExamComponent } from './components/TX22G8SS-exam/TX22G8SS-exam.component';
import { TX22G8SSKeyComponent } from './components/TX22G8SS-key/TX22G8SS-key.component';
import { TX21G8SSExamComponent } from './components/TX21G8SS-exam/TX21G8SS-exam.component';
import { TX21G8SSKeyComponent } from './components/TX21G8SS-key/TX21G8SS-key.component';
import { TX19G8SSExamComponent } from './components/TX19G8SS-exam/TX19G8SS-exam.component';
import { TX19G8SSKeyComponent } from './components/TX19G8SS-key/TX19G8SS-key.component';
import { TX18G8SSExamComponent } from './components/TX18G8SS-exam/TX18G8SS-exam.component';
import { TX18G8SSKeyComponent } from './components/TX18G8SS-key/TX18G8SS-key.component';

// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//   signInFlow: 'popup',
//   signInOptions: [{
//     provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     requireDisplayName: true,
//   }],
//   tosUrl: '/',
//   privacyPolicyUrl: '/'
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamsComponent,
    ProblemsComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
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
    PA22G3MExamComponent,
    PA22G3MKeyComponent,
    PA21G3MExamComponent,
    PA21G3MKeyComponent,
    PA19G3MExamComponent,
    PA19G3MKeyComponent,
    PA18G3MExamComponent,
    PA18G3MKeyComponent,
    PA16G3MExamComponent,
    PA16G3MKeyComponent,
    PA15G3MExamComponent,
    PA15G3MKeyComponent,
    PA22G4MExamComponent,
    PA22G4MKeyComponent,
    PA21G4MExamComponent,
    PA21G4MKeyComponent,
    PA19G4MExamComponent,
    PA19G4MKeyComponent,
    PA18G4MExamComponent,
    PA18G4MKeyComponent,
    PA16G4MExamComponent,
    PA16G4MKeyComponent,
    PA15G4MExamComponent,
    PA15G4MKeyComponent,
    PA22G4SExamComponent,
    PA22G4SKeyComponent,
    PA21G4SExamComponent,
    PA21G4SKeyComponent,
    PA19G4SExamComponent,
    PA19G4SKeyComponent,
    PA18G4SExamComponent,
    PA18G4SKeyComponent,
    PA16G4SExamComponent,
    PA16G4SKeyComponent,
    PA15G4SExamComponent,
    PA15G4SKeyComponent,
    PA22G5MExamComponent,
    PA22G5MKeyComponent,
    PA21G5MExamComponent,
    PA21G5MKeyComponent,
    PA19G5MExamComponent,
    PA19G5MKeyComponent,
    PA18G5MExamComponent,
    PA18G5MKeyComponent,
    PA16G5MExamComponent,
    PA16G5MKeyComponent,
    PA15G5MExamComponent,
    PA15G5MKeyComponent,
    PA22G6MExamComponent,
    PA22G6MKeyComponent,
    PA21G6MExamComponent,
    PA21G6MKeyComponent,
    PA19G6MExamComponent,
    PA19G6MKeyComponent,
    PA18G6MExamComponent,
    PA18G6MKeyComponent,
    PA16G6MExamComponent,
    PA16G6MKeyComponent,
    PA15G6MExamComponent,
    PA15G6MKeyComponent,
    TX22G3MExamComponent,
    TX22G3MKeyComponent,
    TX21G3MExamComponent,
    TX21G3MKeyComponent,
    TX19G3MExamComponent,
    TX19G3MKeyComponent,
    TX18G3MExamComponent,
    TX18G3MKeyComponent,
    TX17G3MExamComponent,
    TX17G3MKeyComponent,
    TX22G4MExamComponent,
    TX22G4MKeyComponent,
    TX21G4MExamComponent,
    TX21G4MKeyComponent,
    TX19G4MExamComponent,
    TX19G4MKeyComponent,
    TX18G4MExamComponent,
    TX18G4MKeyComponent,
    TX17G4MExamComponent,
    TX17G4MKeyComponent,
    TX22G5MExamComponent,
    TX22G5MKeyComponent,
    TX21G5MExamComponent,
    TX21G5MKeyComponent,
    TX19G5MExamComponent,
    TX19G5MKeyComponent,
    TX18G5MExamComponent,
    TX18G5MKeyComponent,
    TX17G5MExamComponent,
    TX17G5MKeyComponent,
    TX22G5SExamComponent,
    TX22G5SKeyComponent,
    TX21G5SExamComponent,
    TX21G5SKeyComponent,
    TX19G5SExamComponent,
    TX19G5SKeyComponent,
    TX18G5SExamComponent,
    TX18G5SKeyComponent,
    TX22G6MExamComponent,
    TX22G6MKeyComponent,
    TX21G6MExamComponent,
    TX21G6MKeyComponent,
    TX19G6MExamComponent,
    TX19G6MKeyComponent,
    TX18G6MExamComponent,
    TX18G6MKeyComponent,
    TX17G6MExamComponent,
    TX17G6MKeyComponent,
    TX22G7MExamComponent,
    TX22G7MKeyComponent,
    TX21G7MExamComponent,
    TX21G7MKeyComponent,
    TX19G7MExamComponent,
    TX19G7MKeyComponent,
    TX18G7MExamComponent,
    TX18G7MKeyComponent,
    TX17G7MExamComponent,
    TX17G7MKeyComponent,
    TX22G8MExamComponent,
    TX22G8MKeyComponent,
    TX21G8MExamComponent,
    TX21G8MKeyComponent,
    TX19G8MExamComponent,
    TX19G8MKeyComponent,
    TX18G8MExamComponent,
    TX18G8MKeyComponent,
    TX17G8MExamComponent,
    TX17G8MKeyComponent,
    TX22G8SExamComponent,
    TX22G8SKeyComponent,
    TX21G8SExamComponent,
    TX21G8SKeyComponent,
    TX19G8SExamComponent,
    TX19G8SKeyComponent,
    TX18G8SExamComponent,
    TX18G8SKeyComponent,
    TX22G8SSExamComponent,
    TX22G8SSKeyComponent,
    TX21G8SSExamComponent,
    TX21G8SSKeyComponent,
    TX19G8SSExamComponent,
    TX19G8SSKeyComponent,
    TX18G8SSExamComponent,
    TX18G8SSKeyComponent,
    TestExamComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgPipesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    // FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    PdfViewerModule,
    NgOtpInputModule,
		// NgxIntlTelInputModule
    // printJS
    // fs
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
