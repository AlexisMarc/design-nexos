import { CommonModule } from '@angular/common';
import { Component, inject, input, output, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { resident, RespData } from '@models';
import { ResidentService } from '@services';
import { NxConfirmDialogService } from '@shared';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'nx-search-resident',
  standalone: true,
  imports: [CommonModule, FormsModule, NgScrollbarModule],
  templateUrl: './nx-search-resident.component.html',
  styleUrl: './nx-search-resident.component.css',
})
export class NxSearchResidentComponent implements OnInit {
  private _residentService = inject(ResidentService);
  private inputSubject: Subject<string> = new Subject<string>();
  valueFilter: string = '';
  public residents: resident[] = [];
  public loading: boolean = false;
  public viewBox: boolean = false;
  public emitResident = output<resident | undefined>();
  public selectedResident = input<resident>();
  private _subscription = new Subscription();
  private _serviceConfirm = inject(NxConfirmDialogService);

  constructor() {
    this.inputSubject.pipe(debounceTime(500)).subscribe(() => {
      this.filterResident();
    });
  }
  private filterResident() {
    this.loading = true;
    this._subscription.add(
      this._residentService
        .getAllResidentialByParam(this.valueFilter, 1)
        .subscribe({
          next: (resp: RespData<resident[]>) => {
            this.sortResident(resp.content);
            this.loading = false;
            this.viewBox = true;
          },
        })
    );
  }

  ngOnInit(): void {
    this.valueFilter = this.selectedResident()
      ? this.selectedResident()!.name
      : '';
  }

  onFilterValue() {
    this.inputSubject.next('');
  }

  selectResident(resident: resident | undefined) {
    this.emitResident.emit(resident);
    if (resident) {
      this.valueFilter = resident.name;
      this.viewBox = false;
    }
  }

  resetValue() {
    this._serviceConfirm.addConfirmDialog({
      title: 'Confirmación de cambio de cliente',
      message: 'Si hay cambios realizados, se perderán, ¿Esta seguro de continuar?',
      type: 'warning',
      buttons: {
        primary: 'Aceptar',
        secondary: 'Cancelar',
      },
      next: () => {
        this.emitResident.emit(undefined);
        this.valueFilter = '';
      },
    });
  }

  private sortResident(residents: resident[]) {
    const sortedResident = residents.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      const searchLower = this.valueFilter.toLowerCase();

      const indexA = nameA.indexOf(searchLower);
      const indexB = nameB.indexOf(searchLower);

      if (indexA === -1 && indexB === -1) {
        return 0;
      } else if (indexA === -1) {
        return 1;
      } else if (indexB === -1) {
        return -1;
      } else {
        return indexA - indexB;
      }
    });
    this.residents = [...sortedResident];
  }
}
