import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@ui';
import { RegisterRouterModule } from './register-routes.module';
import {
  CustomizeRegisterComponent,
  FormBasicValuesRegisterComponent,
  FormDesignRegisterComponent,
  ModelerFormRegisterComponent,
  RegisterComponent,
} from '@register';
import {
  NxColorFieldComponent,
  NxDropdownFieldComponent,
  NxFileFieldComponent,
  NxProgressBarComponent,
  NxSearchResidentComponent,
  NxToggleSwitchComponent,
} from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ControlErrorsDirective, FormSubmitDirective } from '@directives';
@NgModule({
  declarations: [
    RegisterComponent,
    FormBasicValuesRegisterComponent,
    CustomizeRegisterComponent,
    FormDesignRegisterComponent,
    ModelerFormRegisterComponent,
  ],
  imports: [
    NxFileFieldComponent,
    NxToggleSwitchComponent,
    NxColorFieldComponent,
    NxDropdownFieldComponent,
    NxSearchResidentComponent,
    NxProgressBarComponent,
    RegisterRouterModule,
    CommonModule,
    LayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    FormSubmitDirective,
    ControlErrorsDirective
  ],
})
export class RegisterModule {}
