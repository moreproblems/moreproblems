import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { HomeComponent } from './components/home/home.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'about/contact', component: AboutContactComponent },
  { path: 'about/parents', component: AboutParentsComponent },
  { path: 'about/students', component: AboutStudentsComponent },
  { path: 'about/teachers', component: AboutTeachersComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'standards', component: StandardsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'join', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'class/:classKey', component: TemplateClassComponent },
  { path: 'exam/:examKey', component: TemplateExamComponent },
  { path: 'exam/:examKey/key', component: TemplateKeyComponent },
  { path: 'exam/:examKey/:classKey', component: TemplateCExamComponent },
  { path: 'quiz/:quizKey', component: TemplateQuizComponent },
  { path: 'quiz/:quizKey/edit', component: TemplateEditQuizComponent },
  { path: 'quiz/:quizKey/:classKey', component: TemplateCQuizComponent },
  { path: 'state/:stateKey', component: TemplateStateComponent },
  { path: 'standards/:subjectKey', component: TemplateStandardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }