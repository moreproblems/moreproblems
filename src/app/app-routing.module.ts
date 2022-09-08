import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'exams', component: ExamsComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }