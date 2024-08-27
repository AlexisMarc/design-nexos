import { NgModule } from '@angular/core';
import { FormLoginComponent, LoginComponent, RecoveryLoginComponent } from '@login';
import { LoginRouterModule } from './login-routes.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormLoginComponent,
    RecoveryLoginComponent,
    LoginComponent
  ],
  imports: [
    LoginRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LoginModule {}
