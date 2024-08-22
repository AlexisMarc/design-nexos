import { NgModule } from '@angular/core';
import { FormLoginComponent, LoginComponent, RecoveryLoginComponent } from '@login';
import { LoginRouterModule } from './login-routes.module';

@NgModule({
  declarations: [
    FormLoginComponent,
    RecoveryLoginComponent,
    LoginComponent
  ],
  imports: [
    LoginRouterModule
  ],
})
export class LoginModule {}
