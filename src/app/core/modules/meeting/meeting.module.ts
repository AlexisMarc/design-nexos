import { NgModule } from '@angular/core';
import { MeetingRouterModule } from './meeting-routes.module';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from '@meeting';
import { LayoutComponent } from '@ui';
@NgModule({
  declarations: [
    MeetingComponent
  ],
  imports: [
    MeetingRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class MeetingModule {}
