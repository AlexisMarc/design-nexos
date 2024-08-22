import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { AdminRouterModule } from './authority-routes.module';
import { AdminComponent } from '@admin';
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class AuthorityModule {}
