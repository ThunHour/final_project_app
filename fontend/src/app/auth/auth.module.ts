import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { OutputComponent } from './components/Output/output.component';
import { FormComponent } from './components/Form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleDashboardComponent } from './components/vehicle-dashboard/vehicle-dashboard.component';



@NgModule({
  declarations: [
    FormComponent,
    OutputComponent,
    VehicleDashboardComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    OutputComponent
  ]
})
export class AuthModule { }
