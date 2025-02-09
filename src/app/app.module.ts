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
import { DumpService } from "./shared/services/dump.service";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExamsComponent } from './components/exams/exams.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { StandardsComponent } from './components/standards/standards.component';
import { AboutComponent } from './components/about/about.component';
import { AboutContactComponent } from './components/about-contact/about-contact.component';
import { AboutParentsComponent } from './components/about-parents/about-parents.component';
import { AboutStudentsComponent } from './components/about-students/about-students.component';
import { AboutTeachersComponent } from './components/about-teachers/about-teachers.component';
import { JoinComponent } from './components/join/join.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TemplateClassComponent } from './components/template-class/template-class.component';
import { TemplateExamComponent } from './components/template-exam/template-exam.component';
import { TemplateCExamComponent } from './components/template-c-exam/template-c-exam.component';
import { TemplateQuizComponent } from './components/template-quiz/template-quiz.component';
import { TemplateCQuizComponent } from './components/template-c-quiz/template-c-quiz.component';
import { TemplateEditQuizComponent } from './components/template-edit-quiz/template-edit-quiz.component';
import { TemplateKeyComponent } from './components/template-key/template-key.component';
import { TemplateStateComponent } from './components/template-state/template-state.component';
import { TemplateStandardsComponent } from './components/template-standards/template-standards.component';

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
    QuizzesComponent,
    StandardsComponent,
    AboutComponent,
    AboutContactComponent,
    AboutParentsComponent,
    AboutTeachersComponent,
    AboutStudentsComponent,
    JoinComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    TemplateClassComponent,
    TemplateExamComponent,
    TemplateCExamComponent,
    TemplateQuizComponent,
    TemplateCQuizComponent,
    TemplateEditQuizComponent,
    TemplateKeyComponent,
    TemplateStateComponent,
    TemplateStandardsComponent
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
  providers: [AuthService, DumpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
