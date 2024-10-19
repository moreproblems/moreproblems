import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { HomeComponent } from './components/home/home.component';
// import { ProblemsComponent } from './components/problems/problems.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { StandardsComponent } from './components/standards/standards.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { TemplateClassComponent } from './components/template-class/template-class.component';
import { TemplateExamComponent } from './components/template-exam/template-exam.component';
import { TemplateCExamComponent } from './components/template-c-exam/template-c-exam.component';
import { TemplateQuizComponent } from './components/template-quiz/template-quiz.component';
import { TemplateCQuizComponent } from './components/template-c-quiz/template-c-quiz.component';
import { TemplateKeyComponent } from './components/template-key/template-key.component';
import { TemplateStateComponent } from './components/template-state/template-state.component';
import { TemplateStandardsComponent } from './components/template-standards/template-standards.component';
import { TestExamComponent } from './components/test-exam/test-exam.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'exams', component: ExamsComponent },
  // { path: 'problems', component: ProblemsComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'standards', component: StandardsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'class/:classKey', component: TemplateClassComponent },
  { path: 'exam/test', component: TestExamComponent },
  { path: 'exam/:examKey', component: TemplateExamComponent },
  { path: 'exam/:examKey/key', component: TemplateKeyComponent },
  { path: 'exam/:examKey/:classKey', component: TemplateCExamComponent },
  { path: 'quiz/:quizKey', component: TemplateQuizComponent },
  { path: 'quiz/:quizKey/:classKey', component: TemplateCQuizComponent },
  { path: 'state/:stateKey', component: TemplateStateComponent },
  { path: 'standards/:subjectKey', component: TemplateStandardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }