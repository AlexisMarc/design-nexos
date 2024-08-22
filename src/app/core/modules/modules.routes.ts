import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'meeting',
    loadChildren: () =>
      import('./meeting/meeting.module').then((m) => m.MeetingModule),
  },
  {
    path: 'control',
    loadChildren: () =>
      import('./control/control.module').then((m) => m.ControlModule),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('./message/message.module').then((m) => m.MessageModule),
  },
  {
    path: 'voters',
    loadChildren: () =>
      import('./voters/voters.module').then((m) => m.VotersModule),
  },
  {
    path: 'authority',
    loadChildren: () =>
      import('./meeting/meeting.module').then((m) => m.MeetingModule),
  },
  {
    path: 'unit',
    loadChildren: () =>
      import('./unit/unit.module').then((m) => m.UnitModule),
  },
  {
    path: 'data',
    loadChildren: () =>
      import('./data/data.module').then((m) => m.DataModule),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then((m) => m.SupportModule),
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./organization/organization.module').then((m) => m.OrganizationModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
