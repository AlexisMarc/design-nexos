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
  EmailService,
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
    unidad: string;
  }[] = [];

  form = new FormGroup({
    email: new FormControl('', [NxValidators.required(), NxValidators.email()]),
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
  private _serviceEmail = inject(EmailService);

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
          this.id_customer = value.id_customer;
          if (!this.meeting) {
            this.redirectReset();
            return;
          }
          if (!value.task_queu_id) this.initQr();

          this.viewSign = this.meeting.signature_module ? true : false;
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

    const { email } = this.form.getRawValue();
    this._loading.view(true);
    this.downloadPdfQr(2, email!);
  }

  private sentEmail(email: string, file_path: string) {
    this._serviceEmail
      .sendEmail({
        email,
        file_path,
      })
      .subscribe({
        next: (value) => {
          if (value.success) {
            this._serviceMessage.addMessage({
              type: 'success',
              message: '¡Envió de QRs exitosamente!',
            });
            this._loading.view(false);
            return;
          }
          this._serviceMessage.addMessage({
            type: 'success',
            message: '¡Envió de QRs exitosamente!',
          });
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'success',
            message: '¡Envió de QRs exitosamente!',
          });
          this._loading.view(false);
        },
      });
  }

  downloadPdfQr(status: 0 | 1 | 2, email?: string) {
    this._loading.view(true);
    this._serviceDoc.createPdfQr(this.task_queu_id!).subscribe({
      next: (value) => {
        if (value.success) {
          switch (status) {
            case 0:
              this.downloadDocument(value.pdf_base64);
              break;
            case 1:
              this.printDocument(value.pdf_base64);
              break;
            case 2:
              this.sentEmail(email!, value.url_pdf);
              break;
          }
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

  private downloadDocument(base: string) {
    this._serviceMessage.addMessage({
      type: 'success',
      message: '¡Descarga exitosamente!',
    });
    this._serviceDoc.downloadBase64PDF(base, 'QRs_List.pdf');
    this._loading.view(false);
  }

  printDocument(base64: string) {
    this._serviceMessage.addMessage({
      type: 'success',
      message: '¡Descarga exitosamente!',
    });
    this._serviceDoc.printBase64PDF(base64);
    this._loading.view(false);
  }
}
