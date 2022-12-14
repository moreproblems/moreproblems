import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TX21G3MExamComponent } from './components/TX21G3M-exam/TX21G3M-exam.component';
import { TX21G3MKeyComponent } from './components/TX21G3M-key/TX21G3M-key.component';
import { TX19G3MExamComponent } from './components/TX19G3M-exam/TX19G3M-exam.component';
import { TX19G3MKeyComponent } from './components/TX19G3M-key/TX19G3M-key.component';
import { StandardsComponent } from './components/standards/standards.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'exams', component: ExamsComponent },
  { path: 'exam/TX21G3M', component: TX21G3MExamComponent },
  { path: 'exam/TX21G3M/key', component: TX21G3MKeyComponent },
  { path: 'exam/TX19G3M', component: TX19G3MExamComponent },
  { path: 'exam/TX19G3M/key', component: TX19G3MKeyComponent },
  { path: 'standards', component: StandardsComponent },
  // { path: 'standards/K-Math', component: KMStandardsComponent },
  // { path: 'standards/G1-Math', component: G1MStandardsComponent },
  // { path: 'standards/G2-Math', component: G2MStandardsComponent },
  // { path: 'standards/G3-Math', component: G3MStandardsComponent },
  // { path: 'standards/G4-Math', component: G4MStandardsComponent },
  // { path: 'standards/G5-Math', component: G5MStandardsComponent },
  // { path: 'standards/G6-Math', component: G6MStandardsComponent },
  // { path: 'standards/G7-Math', component: G7MStandardsComponent },
  // { path: 'standards/G8-Math', component: G8MStandardsComponent },
  // { path: 'standards/HS-Number-Quant', component: HSNQStandardsComponent },
  // { path: 'standards/HS-Algebra', component: HSAStandardsComponent },
  // { path: 'standards/HS-Functions', component: HSFStandardsComponent },
  // { path: 'standards/HS-Modeling', component: HSMStandardsComponent },
  // { path: 'standards/HS-Geometry', component: HSGStandardsComponent },
  // { path: 'standards/HS-Stats-Prob', component: HSSPStandardsComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }