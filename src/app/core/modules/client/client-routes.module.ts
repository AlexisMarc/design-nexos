import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ClientCertificateComponent,
  ClientComponent,
  ClientDynamicFormComponent,
  ClientLoginComponent,
  ClientPreviewComponent,
  ClientQrComponent,
  ClientScannerComponent,
  ClientUnitComponent,
} from '@client';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'login',
        component: ClientLoginComponent,
      },
      {
        path: 'form',
        component: ClientDynamicFormComponent,
      },
      {
        path: 'unit',
        component: ClientUnitComponent,
      },
      {
        path: 'certificate',
        component: ClientCertificateComponent,
      },
      {
        path: 'qr',
        component: ClientQrComponent,
      },
      {
        path: 'scanner',
        component: ClientScannerComponent,
      },
      {
        path: '',
        component: ClientPreviewComponent,
      },
      {
        path: ':id',
        component: ClientPreviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRouterModule {}
