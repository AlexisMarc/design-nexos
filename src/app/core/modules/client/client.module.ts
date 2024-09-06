import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@ui';
import { ClientRouterModule } from './client-routes.module';
import {
  ClientCertificateComponent,
  ClientComponent,
  ClientDynamicFormComponent,
  ClientLoginComponent,
  ClientUnitComponent,
} from '@client';
import { NxToggleSwitchComponent } from '@shared';
import { NgScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  declarations: [
    ClientComponent,
    ClientLoginComponent,
    ClientDynamicFormComponent,
    ClientCertificateComponent,
    ClientUnitComponent
  ],
  imports: [
    NgScrollbarModule,
    ClientRouterModule,
    CommonModule,
    NxToggleSwitchComponent,
    LayoutComponent,
  ],
})
export class CLientModule {}
