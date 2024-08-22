import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { OrganizationRouterModule } from './organization-routes.module';
import { OrganizationComponent } from '@organization';
@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    OrganizationRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class OrganizationModule {}
