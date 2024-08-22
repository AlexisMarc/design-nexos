import { NgModule } from '@angular/core';
import { HomeRouterModule } from './home-routes.module';
import { CardHomeComponent, HomeComponent } from '@home';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    CardHomeComponent
  ],
  imports: [
    HomeRouterModule,
    MatIconModule
  ],
})
export class HomeModule {}
