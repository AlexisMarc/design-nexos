import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { EcTableComponent } from "./nx-table.component";
import { EcCellDef } from "./directives/ec-cell-def.directive";
import { EcColumnDef } from "./directives/ec-column-def.directive";
import { EcHeaderCell } from "./directives/ec-header-cell.directive";
import { EcHeaderCellDef } from "./directives/ec-header-cell-def.directive";
import { EcPaginatorComponent } from "./components/ec-paginator/ec-paginator.component";

@NgModule({
  declarations: [
    EcTableComponent,
    EcCellDef,
    EcColumnDef,
    EcHeaderCell,
    EcHeaderCellDef
  ],
  imports: [
    CommonModule,
    EcPaginatorComponent,
    FormsModule,
  ],
  exports: [
    EcTableComponent,
    EcCellDef,
    EcColumnDef,
    EcHeaderCell,
    EcHeaderCellDef
  ]
})
export class NxTableModule{}
