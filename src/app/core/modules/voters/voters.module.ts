import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { VotersRouterModule } from './voters-routes.module';
import { VotersComponent } from '@voters';
@NgModule({
  declarations: [
    VotersComponent
  ],
  imports: [
    VotersRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class VotersModule {}
