import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxTableComponent } from './components/nx-table.component';
import { NxTheadTableDirective } from './directives/nx-thead-table.directive';
import { NxTbodyTableDirective } from './directives/nx-tbody-table.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [
    NxTableComponent,
    NxTheadTableDirective,
    NxTbodyTableDirective
  ],
  exports: [
    NxTableComponent
  ],
})
export class SharedModule { }