import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NxValidators } from '@helpers';
import { AppStore, meetingDataAll, MeetingWelcome } from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  DocumentServiceService,
} from '@services';
import { NxLoadingService, NxToastService } from '@shared';
import { TaskQueuid } from '@store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-qr',
  templateUrl: './client-qr.component.html',
  styleUrl: './client-qr.component.css',
})
export class ClientQrComponent implements OnInit, OnDestroy {
  public task_queu_id?: number;
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  private id_customer?: string;
  private status: boolean = false;
  public qrArray: {
    nombre: string;
    img: string;
    documento: string;
  }[] = [];

  form = new FormGroup({
    task_addressee: new FormControl('', [NxValidators.required()]),
    task_destination: new FormControl(''),
  });

  viewSign: boolean = true;
  values = { OneValue: 'WhatsApp', TwoValue: 'Email' };
  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _serviceDoc = inject(DocumentServiceService);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _router = inject(Router);
  private _loading = inject(NxLoadingService);
  private _serviceMessage = inject(NxToastService);

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
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
          this.welcome = structuredClone(value.welcome);
          this.meeting = structuredClone(value.meeting);
          this.task_queu_id = value.task_queu_id;
          //this.form_response_id = value.form_response_id;
          this.id_customer = value.id_customer;
          if (!this.meeting) {
            this.redirectReset();
            return;
          }
          if (!value.task_queu_id) this.initQr();
        },
      })
    );
  }

  private initQr() {
    this._loading.view(true);
    if (!this.id_customer && this.status) {
      this._loading.view(false);
      return;
    }
    this._subscription.add(
      this._serviceDoc.createQr(this.id_customer!).subscribe({
        next: (value) => {
          this.status = true;
          console.log(value);
          this.qrArray = [...value.content];
          this._store.dispatch(
            TaskQueuid({ task_queu_id: value.task_queu_id })
          );
          this._loading.view(false);
        },
        error: () => {
          this._loading.view(false);
        },
      })
    );
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }

  public sentQr() {
    if (this.form.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar el campo requerido',
      });
      this.form.markAllAsTouched();
      return;
    }

    const { task_addressee, task_destination } = this.form.getRawValue();
    this._loading.view(true);
    this._serviceDoc
      .sentQr(this.task_queu_id!, {
        task_addressee: task_addressee!,
        task_destination: task_destination!,
      })
      .subscribe({
        next: (value) => {
          if (value.success) {
            this._serviceMessage.addMessage({
              type: 'success',
              message: '¡Envió de QRs exitosamente!',
            });
            this._loading.view(true);
            return;
          }
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al enviar los QRs...',
          });
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al enviar los QRs...',
          });
          this._loading.view(false);
        },
      });
  }

  downloadPdfQr(is_download: boolean) {
    this._loading.view(true);
    this._serviceDoc.createPdfQr(this.task_queu_id!).subscribe({
      next: (value) => {
        if (value.success) {
          this._serviceMessage.addMessage({
            type: 'success',
            message: '¡Descarga exitosamente!',
          });
          if (is_download) {
            this.downloadDocument(value.url_pdf);
          } else this.printDocument(value.url_pdf);
          return;
        }
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al descargar...',
        });
        this._loading.view(false);
      },
      error: () => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al descargar...',
        });
        this._loading.view(false);
      },
    });
  }

  private downloadDocument(url: string) {
    window.open(url, '_blank');
    this._loading.view(false);
    return;
  }

  printDocument(url: string) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
      this._loading.view(false);
    };
  }
}
