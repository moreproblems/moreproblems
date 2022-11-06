import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TX21G3MComponent } from './components/TX21G3M/TX21G3M.component';
import { TX21G3MKeyComponent } from './components/TX21G3M-key/TX21G3M-key.component';
import { TX19G3MComponent } from './components/TX19G3M/TX19G3M.component';
import { TX19G3MKeyComponent } from './components/TX19G3M-key/TX19G3M-key.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'exams', component: ExamsComponent },
  { path: 'exam/TX21G3M', component: TX21G3MComponent },
  { path: 'exam/TX21G3M/key', component: TX21G3MKeyComponent },
  { path: 'exam/TX19G3M', component: TX19G3MComponent },
  { path: 'exam/TX19G3M/key', component: TX19G3MKeyComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }