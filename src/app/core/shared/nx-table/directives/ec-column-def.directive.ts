import {
  ContentChild,
  Directive,
  ElementRef,
  Input
} from "@angular/core";
import {EcHeaderCellDef} from "./ec-header-cell-def.directive";
import {EcCellDef} from "./ec-cell-def.directive";

@Directive({
  selector: '[ecColumnDef]',
  host: {}
})
export class EcColumnDef {
  @Input() type: string | undefined;
  @ContentChild(EcHeaderCellDef) headerCellDef!: EcHeaderCellDef;
  @ContentChild(EcCellDef) cellDef!: EcCellDef;

  @Input('ecColumnDef') name: string | undefined;


  constructor(public element: ElementRef) {}

  getType(): string {
    return this.name!;
  }
  getTemplateHeaderCell(): EcHeaderCellDef {
    return this.headerCellDef!;
  }
}
