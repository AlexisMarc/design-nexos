
import { NgModule } from '@angular/core';
import { HomeRouterModule } from './home-routes.module';
import { CardHomeComponent, HomeComponent } from '@home';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@ui';

@NgModule({
  declarations: [
    HomeComponent,
    CardHomeComponent
  ],
  imports: [
    HomeRouterModule,
    MatIconModule,
    CommonModule,
    LayoutComponent
  ],
})
export class HomeModule {}
