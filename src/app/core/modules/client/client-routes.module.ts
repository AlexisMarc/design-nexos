import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCertificateComponent, ClientComponent, ClientDynamicFormComponent, ClientLoginComponent, ClientUnitComponent } from '@client';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'login',
        component: ClientLoginComponent
      },
      {
        path: 'form',
        component: ClientDynamicFormComponent
      },
      {
        path: 'unit',
        component: ClientUnitComponent
      },
      {
        path: 'certificate',
        component: ClientCertificateComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRouterModule {
  }