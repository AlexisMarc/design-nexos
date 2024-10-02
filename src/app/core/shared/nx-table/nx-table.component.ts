import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren, inject,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { EcColumnDef } from './directives/ec-column-def.directive';

@Component({
  selector: 'nx-table',
  templateUrl: './nx-table.component.html',
  styleUrls: ['./nx-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcTableComponent<T> implements OnChanges, AfterContentInit {
  public _dataSource: T[] = []
  public _data: T[] = []
  public searchTerm: string = '';

  @Input() set dataSource(data: T[]) {
    this._dataSource = data;
    this._data = data;
  }
  @Input() paginator: boolean = false;
  @Input() rows: number = 0;

  @Input() columnSelectedForSearch: string = '';

  @ContentChildren(EcColumnDef) templatesColumn!: QueryList<EcColumnDef>;

  private _cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {

    }

    if (this.paginator) {
      this.applyPaginator();
    }
  }

  ngAfterContentInit() {

  }

  private applyPaginator() {
    if (this.paginator && this.rows > 0) {
      this._data = this._dataSource.slice(0, this.rows);
    }
  }

  public backPage(paginationCurrent: number) {
    const startPagination = (paginationCurrent - 1) * this.rows;
    const endPagination = paginationCurrent * this.rows;
    this._data = this._dataSource.slice(startPagination, endPagination);
    this._cd.detectChanges();
  }

  public nextPage(paginationCurrent: number) {
    const startPagination = (paginationCurrent - 1) * this.rows;
    const endPagination = paginationCurrent * this.rows;
    this._data = this._dataSource.slice(startPagination, endPagination);
    this._cd.detectChanges();
  }

  public getTemplateRow(header: EcColumnDef): TemplateRef<any> {
    if (header.cellDef === undefined) {
      console.error('Not found column', header.getType())
    }
    return header.cellDef.template
  }

  public getIndexRow(element: T): number {
    return this._dataSource.findIndex((item) => item === element);
  }

  public filterData(): void {
    if (this.searchTerm != '') {
      this._data = this._dataSource.filter((item: T) => {
        if (typeof item === 'object' && item !== null) {
          const key = this.columnSelectedForSearch as keyof T;
          const val = item[key];
          return val && val.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      });
    } else {
      this._data = structuredClone(this._dataSource);
      this.applyPaginator();
    }
  }
}
