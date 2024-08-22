import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotersComponent } from '@voters';

export const routes: Routes = [
  {
    path: '',
    component: VotersComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VotersRouterModule {
  }