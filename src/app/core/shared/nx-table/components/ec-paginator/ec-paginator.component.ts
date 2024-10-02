import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ec-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ec-paginator.component.html',
  styleUrls: ['./ec-paginator.component.css'],
})
export class EcPaginatorComponent implements OnChanges {
  @Input() totalRecords: number = 1;
  @Input() rows: number = 1;
  @Output() onNextPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() onBackPage: EventEmitter<number> = new EventEmitter<number>();

  public _currentPagination: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRecords']) {
      this._currentPagination = 1;
    }
  }

  public nextPage() {
    if (this._currentPagination * this.rows >= this.totalRecords) return;

    this._currentPagination++;
    this.onNextPage.emit(this._currentPagination);
  }

  public backPage() {
    if (this._currentPagination <= 1) return;

    this._currentPagination--;
    this.onBackPage.emit(this._currentPagination);
  }

  get limitLeftPagination() {
    return this._currentPagination === 1
      ? 1
      : (this._currentPagination - 1) * this.rows;
  }

  get limitRightPagination() {
    const records = this._currentPagination * this.rows;
    return records >= this.totalRecords ? this.totalRecords : records;
  }
}
