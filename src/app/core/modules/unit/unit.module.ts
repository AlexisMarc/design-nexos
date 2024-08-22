import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { UnitRouterModule } from './unit-routes.module';
import { UnitComponent } from '@unit';
@NgModule({
  declarations: [
    UnitComponent
  ],
  imports: [
    UnitRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class UnitModule {}
