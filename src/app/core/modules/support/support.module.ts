import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { SupportRouterModule } from './support-routes.module';
import { SupportComponent } from '@support';
@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    SupportRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class SupportModule {}
