import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@ui';
import { SignaturePadModule } from '@viablelogic/ngx-signature-pad';
import { ClientRouterModule } from './client-routes.module';
import {
  ClientCertificateComponent,
  ClientComponent,
  ClientDynamicFormComponent,
  ClientLoginComponent,
  ClientPreviewComponent,
  ClientQrComponent,
  ClientScannerComponent,
  ClientSignComponent,
  ClientUnitComponent,
} from '@client';
import { NxDropdownFieldComponent, NxToggleSwitchComponent } from '@shared';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {WebcamModule} from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorsDirective, FormSubmitDirective } from '@directives';
import { RecaptchaModule } from "ng-recaptcha-2";
@NgModule({
  declarations: [
    ClientComponent,
    ClientLoginComponent,
    ClientDynamicFormComponent,
    ClientCertificateComponent,
    ClientUnitComponent,
    ClientSignComponent,
    ClientQrComponent,
    ClientScannerComponent,
    ClientPreviewComponent
  ],
  imports: [
    NgScrollbarModule,
    ClientRouterModule,
    CommonModule,
    NxToggleSwitchComponent,
    NxDropdownFieldComponent,
    LayoutComponent,
    WebcamModule,
    FormsModule,
    ReactiveFormsModule,
    FormSubmitDirective,
    ControlErrorsDirective,
    SignaturePadModule,
    RecaptchaModule
  ],
})
export class CLientModule {}
