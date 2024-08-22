import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/modules/modules.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
