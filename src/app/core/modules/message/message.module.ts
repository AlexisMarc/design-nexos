import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { LayoutComponent } from '@ui';
import { MessageRouterModule } from './message-routes.module';
import { MessageComponent } from '@message';
@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    MessageRouterModule,
    CommonModule,
    LayoutComponent
  ],
})
export class MessageModule {}
