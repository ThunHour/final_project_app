import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './auth/components/Form/form.component';
import { OutputComponent } from './auth/components/Output/output.component';
import { VehicleDashboardComponent } from './auth/components/vehicle-dashboard/vehicle-dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';


const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'output', component: OutputComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: VehicleDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }