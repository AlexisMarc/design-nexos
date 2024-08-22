import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@ui';
import { DataRouterModule } from './data-routes.module';
import { DataComponent } from '@data';
@NgModule({
  declarations: [DataComponent],
  imports: [DataRouterModule, CommonModule, LayoutComponent],
})
export class DataModule {}
