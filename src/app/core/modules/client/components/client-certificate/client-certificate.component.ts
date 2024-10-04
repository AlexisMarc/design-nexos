import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, meetingDataAll, MeetingWelcome, unit } from '@models';
import { Store } from '@ngrx/store';
import {
  ArrayUnits,
  colorsDynamic,
  ColorServiceService,
  DocumentServiceService,
  unitRelated,
} from '@services';
import {
  NxConfirmDialogService,
  NxLoadingService,
  NxToastService,
} from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-certificate',
  templateUrl: './client-certificate.component.html',
  styleUrl: './client-certificate.component.css',
})
export class ClientCertificateComponent implements OnInit {
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  public customer_id?: string;
  private documents: { [key: string]: string } = {};

  values = { TwoValue: 'Entregado', OneValue: 'Entrega después' };
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceDoc = inject(DocumentServiceService);
  private unitRelated: ArrayUnits[] = [];
  private units: unit[] = [];
  public unitsSelect: unit[] = [];
  public certificate: { [key: string]: boolean } = {};
  private _router = inject(Router);
  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _serviceMessage = inject(NxToastService);
  private _loading = inject(NxLoadingService);
  private _serviceConfirm = inject(NxConfirmDialogService);

  public idUnit = 0;
  public showScanner = false;

  ngOnInit(): void {
    this.initSubscription();
  }

  private initSubscription() {
    this._subscription.add(
      this._serviceColors.messages$.subscribe({
        next: (colors) => {
          this.colors = { ...colors };
        },
      })
    );

    this._subscription.add(
      this._store.select('clientRegister').subscribe({
        next: (value) => {
          this.meeting = value.meeting;
          this.welcome = value.welcome;
          this.units = structuredClone(value.units) ?? [];
          this.unitRelated = structuredClone(value.selectUnit) ?? [];
          this.customer_id = value.id_customer;
          if (this.meeting) {
            if (this.meeting.shall_ask_representation_document === 0) {
              this.redirectQr();
              return;
            }
            this.initData();
          } else {
            this.redirectReset();
          }
        },
      })
    );
  }

  private initData() {
    const filterStatus = this.unitRelated.filter((unit) => unit.is_owner === 0);
    const unitRelated = filterStatus.map((unit) => unit.id.toString());
    const filter = this.units.filter((unit) =>
      unitRelated.includes(unit.id.toString())
    );
    this.unitsSelect = [...filter];
    this.certificate = {};
    if (!this.unitsSelect.length) this.redirectQr();
    this.unitsSelect.forEach((unit) => {
      this.certificate[unit.id] = false;
    });
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }

  private async redirectQr() {
    await this._router.navigate(['client/qr']);
  }

  async setFileCertificate(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      const element = files[0];
      const doc = await this._serviceDoc.convertFileToBase64(element);
      this.certificate[index.toString()] = true;
      this.documents[index.toString()] = doc;
    }
  }

  public saveCertificate() {
    if (!this.validCertificate()) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor, completar el cargue de todos los poderes',
      });
      return;
    }
    const docs: string[] = [];
    for (const key in this.documents) {
      if (this.documents.hasOwnProperty(key)) {
        docs.push(this.documents[key]);
      }
    }
    this._loading.view(true);
    this._subscription.add(
      this._serviceDoc
        .saveDocumentCertificate(
          docs,
          this.customer_id!,
          this.meeting!.meeting_id.toString()
        )
        .subscribe({
          next: (value) => {
            if (value.success) {
              this._serviceMessage.addMessage({
                type: 'success',
                message: 'Poderes guardados exitosamente!',
              });
              this._loading.view(false);
              this.redirectQr();
            } else {
              this._serviceMessage.addMessage({
                type: 'error',
                message: 'Error en el guardar los poderes...',
              });
              this._loading.view(false);
            }
          },
          error: () => {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error en el guardar los poderes...',
            });
            this._loading.view(false);
          },
        })
    );
  }

  private validCertificate() {
    for (const key in this.certificate) {
      if (this.certificate.hasOwnProperty(key)) {
        if (!this.certificate[key]) return false;
      }
    }
    return true;
  }

  public scannerCertificate(id: number, reset: boolean = false) {
    if (reset) {
      this.idUnit = -1;
      this.showScanner = false;
      return;
    }
    this.idUnit = id;
    this.showScanner = true;
  }

  public saveScanner(certificate: string) {
    this.certificate[this.idUnit.toString()] = true;
    this.documents[this.idUnit.toString()] = certificate;
    this.scannerCertificate(0, true);
  }

  public clearCertificate(id: number) {
    this._serviceConfirm.addConfirmDialog({
      type: 'warning',
      title: 'Confirmación de borrado',
      message: 'Se perderá los datos subidos, ¿Esta seguro de continuar?',
      buttons: {
        primary: 'Aceptar',
        secondary: 'Cancelar',
      },
      next: () => {
        this.certificate[id.toString()] = false;
      },
    });
  }
}
