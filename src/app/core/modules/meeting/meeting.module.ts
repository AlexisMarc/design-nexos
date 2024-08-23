import { NgModule } from '@angular/core';
import { MeetingRouterModule } from './meeting-routes.module';
import { CommonModule } from '@angular/common';
import { BasicFormMeetingComponent, ConfigFormMeetingComponent, MeetingComponent, StyleFormMeetingComponent } from '@meeting';
import { LayoutComponent } from '@ui';
import { NgScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  declarations: [
    MeetingComponent,
    BasicFormMeetingComponent,
    ConfigFormMeetingComponent,
    StyleFormMeetingComponent
  ],
  imports: [
    NgScrollbarModule,
    MeetingRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class MeetingModule {}
