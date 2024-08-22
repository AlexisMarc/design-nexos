import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { ControlRouterModule } from './control-routes.module';
import { ControlComponent } from '@control';
@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    ControlRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class ControlModule {}
