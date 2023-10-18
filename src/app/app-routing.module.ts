import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from './components/exams/exams.component';
import { HomeComponent } from './components/home/home.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { TemplateClassComponent } from './components/template-class/template-class.component';
import { TemplateExamComponent } from './components/template-exam/template-exam.component';
import { TemplateCExamComponent } from './components/template-c-exam/template-c-exam.component';
import { TemplateKeyComponent } from './components/template-key/template-key.component';
import { TestExamComponent } from './components/test-exam/test-exam.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'exams', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'problems', component: ProblemsComponent },
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
  { path: 'standards/K-Math', component: KMStandardsComponent },
  { path: 'standards/K-English', component: KEStandardsComponent },
  { path: 'standards/G1-Math', component: G1MStandardsComponent },
  { path: 'standards/G1-English', component: G1EStandardsComponent },
  { path: 'standards/G2-Math', component: G2MStandardsComponent },
  { path: 'standards/G2-English', component: G2EStandardsComponent },
  { path: 'standards/G3-Math', component: G3MStandardsComponent },
  { path: 'standards/G3-English', component: G3EStandardsComponent },
  { path: 'standards/G4-Math', component: G4MStandardsComponent },
  { path: 'standards/G4-English', component: G4EStandardsComponent },
  { path: 'standards/G5-Math', component: G5MStandardsComponent },
  { path: 'standards/G5-English', component: G5EStandardsComponent },
  { path: 'standards/G6-Math', component: G6MStandardsComponent },
  { path: 'standards/G6-English', component: G6EStandardsComponent },
  { path: 'standards/G7-Math', component: G7MStandardsComponent },
  { path: 'standards/G7-English', component: G7EStandardsComponent },
  { path: 'standards/G8-Math', component: G8MStandardsComponent },
  { path: 'standards/G8-English', component: G8EStandardsComponent },
  { path: 'standards/HS1-English', component: HS1EStandardsComponent },
  { path: 'standards/HS2-English', component: HS2EStandardsComponent },
  { path: 'standards/HS-Math-Number-Quantity', component: HSMNQStandardsComponent },
  { path: 'standards/HS-Math-Algebra', component: HSMAStandardsComponent },
  { path: 'standards/HS-Math-Functions', component: HSMFStandardsComponent },
  { path: 'standards/HS-Math-Geometry', component: HSMGStandardsComponent },
  { path: 'standards/HS-Math-Statistics-Probability', component: HSMSPStandardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }