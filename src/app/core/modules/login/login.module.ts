import { NgModule } from '@angular/core';
import { FormLoginComponent, LoginComponent, RecoveryLoginComponent } from '@login';
import { LoginRouterModule } from './login-routes.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    FormLoginComponent,
    RecoveryLoginComponent,
    LoginComponent
  ],
  imports: [
    LoginRouterModule,
    CommonModule
  ],
})
export class LoginModule {}
