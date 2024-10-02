import {
  Directive,
  Input,
  TemplateRef,
} from "@angular/core";

@Directive({
  selector: '[ecHeaderCellDef]',
  host: {}
})
export class EcHeaderCellDef{
  @Input() type: string | undefined;

  @Input('ecColumnDef') name: string | undefined;


  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }

}
