import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, meetingDataAll, MeetingWelcome, unit } from '@models';
import { Store } from '@ngrx/store';
import {
  ArrayUnits,
  colorsDynamic,
  ColorServiceService,
  UnitServiceService,
} from '@services';
import {
  NxToastService,
  NxLoadingService,
  NxConfirmDialogService,
} from '@shared';
import { DataSelectUnit, DataUnits } from '@store';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-client-unit',
  templateUrl: './client-unit.component.html',
  styleUrl: './client-unit.component.css',
})
export class ClientUnitComponent implements OnInit, OnDestroy {
  filter: string = '';
  private inputSubject: Subject<string> = new Subject<string>();
  values = { OneValue: 'Propietario', TwoValue: 'Apoderado' };
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  public id_customer?: string;
  public units: unit[] = [];
  public unitsSelect: unit[] = [];
  public filterUnits: unit[] = [];
  public shall_ask_representation_document: boolean = false;
  public limit_raising_by_customer: number = -1;
  public unitCertificate: { [key: string]: boolean } = {};

  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _router = inject(Router);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);
  private _serviceConfirm = inject(NxConfirmDialogService);
  private _loading = inject(NxLoadingService);
  private _serviceUnit = inject(UnitServiceService);

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private initSubscription() {
    this._subscription.add(
      this.inputSubject.pipe(debounceTime(500)).subscribe(() => {
        this.filterUnit();
      })
    );
    this._subscription.add(
      this._serviceColors.messages$.subscribe({
        next: (colors) => {
          this.colors = { ...colors };
        },
      })
    );
    this._subscription.add(
      this._subscription.add(
        this._store.select('clientRegister').subscribe({
          next: (value) => {
            this.meeting = value.meeting;
            this.welcome = value.welcome;
            this.id_customer = value.id_customer;
            this.units = structuredClone(value.units) ?? [];
            this.filterUnit();
            if (this.meeting) {
              if (this.meeting.shall_ask_representation_document) {
                this.shall_ask_representation_document = true;
              } else {
                this.shall_ask_representation_document = false;
              }
              this.values = {
                OneValue: this.meeting.label_name_owner,
                TwoValue: this.meeting.label_name_agent,
              };

              if (this.meeting.limit_raising_by_customer) {
                this.limit_raising_by_customer =
                  this.meeting.limit_raising_by_customer;
              } else {
                this.limit_raising_by_customer = -1;
              }

              this.initValues(this.meeting.meeting_id.toString());
            } else {
              this.redirectReset();
            }
          },
        })
      )
    );
  }

  onFilterValue() {
    this.inputSubject.next('');
  }

  private filterUnit() {
    if (this.filter === '') {
      this.filterUnits = [...this.units];
      return;
    }
    const filter = this.units.filter((unit) =>
      unit.name.toUpperCase().includes(this.filter.toUpperCase())
    );
    this.filterUnits = [...filter];
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }

  private async redirectCertificate() {
    await this._router.navigate(['client/certificate']);
  }

  private initValues(meeting_id: string) {
    if (this.units.length) {
      return;
    }
    this._loading.view(true);
    this._subscription.add(
      this._serviceUnit.getUnitsByMeetingId(meeting_id).subscribe({
        next: (value) => {
          if (value.success) {
            if (value.content && value.content.length) {
              this._store.dispatch(DataUnits({ units: value.content }));
            }
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al consultar las unidades...',
            });
          }
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar las unidades...',
          });
        },
      })
    );

    this._subscription.add(
      this._serviceUnit.getUnitsByMeetingIdByCustomer(meeting_id, this.id_customer!).subscribe({
        next: (value) => {
          if (value.success) {
            if (value.content && value.content.length) {
              this.unitsSelect = [...value.content];
            }
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al consultar las unidades...',
            });
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar las unidades asignadas...',
          });
        },
      })
    );
  }

  clearUnit(unit: number) {
    this._serviceConfirm.addConfirmDialog({
      type: 'warning',
      title: 'Confirmación de eliminación',
      message: '¿Esta seguro de eliminar la unidad seleccionada?',
      buttons: {
        primary: 'Aceptar',
        secondary: 'Cancelar',
      },
      next: () => {
        if (!this.unitsSelect.length) return;
        const unitSelect = this.unitsSelect[unit];
        if (unitSelect) this.unitCertificate[unitSelect.id.toString()] = false;
        const units = this.unitsSelect.filter((_, index) => unit !== index);
        this.unitsSelect = [...units];
      },
      style: {backgroundColor: this.colors.primary}
    });
  }

  addUnit(index: number) {
    if (
      this.limit_raising_by_customer !== -1 &&
      this.unitsSelect.length === this.limit_raising_by_customer
    ) {
      this._serviceMessage.addMessage({
        message: `Solo puede seleccionar ${this.limit_raising_by_customer} unidades como máximo`,
        type: 'warning',
      });
      return;
    }
    const unit = this.units[index];
    this.unitsSelect = [...this.unitsSelect, unit];
    this._serviceMessage.addMessage({
      message: 'Unidad seleccionada exitosamente',
      type: 'success',
    });
  }

  validAdd(unit: unit) {
    return !this.unitsSelect.find((item) => item.name === unit.name);
  }

  confirmSaveRelated() {
    this._serviceConfirm.addConfirmDialog({
      type: 'warning',
      title: 'Confirmación de continuación',
      message:
        '¿Esta seguro de asignar las unidades seleccionadas? Una vez relacionadas no podrá realizar cambios',
      buttons: {
        primary: 'Aceptar',
        secondary: 'Cancelar',
      },
      next: () => {
        this.saveRelated();
      },
      style: {backgroundColor: this.colors.primary}
    });
  }

  private saveRelated() {
    const array_units: ArrayUnits[] = this.unitsSelect.map((unit) => ({
      id: unit.id,
      is_owner: this.unitCertificate[unit.id.toString()] ? 0 : 1,
    }));
    this._loading.view(true);
    this._store.dispatch(DataSelectUnit({ selectUnit: array_units }));
    this._serviceUnit
      .saveRelateUnit({ customer_id: this.id_customer!, array_units })
      .subscribe({
        next: (value) => {
          if (value.success) {
            this._serviceMessage.addMessage({
              type: 'success',
              message: '¡Unidades relacionadas exitosamente!',
            });
            this._loading.view(false);
            this.redirectCertificate();
            return;
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al guardar la relación de las unidades',
            });
          }
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al guardar la relación de las unidades',
          });
          this._loading.view(false);
        },
      });
  }

  shallAskRepresentationDocument(value: string, index: number) {
    debugger;
    const unit = this.unitsSelect[index];
    if (unit) {
      if (value === this.values.OneValue) {
        this.unitCertificate[unit.id.toString()] = true;
        return;
      }
      this.unitCertificate[unit.id.toString()] = false;
    }
  }
}
