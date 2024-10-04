import {
  Component,
  inject,
  OnDestroy,
  output,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, meetingDataAll } from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  DocumentServiceService,
} from '@services';
import { NxLoadingService, NxToastService } from '@shared';
import { SignaturePad } from '@viablelogic/ngx-signature-pad';
import { Subscription } from 'rxjs';
@Component({
  selector: 'client-sign',
  templateUrl: './client-sign.component.html',
  styleUrl: './client-sign.component.css',
})
export class ClientSignComponent implements OnInit, OnDestroy {
  status: boolean = false;
  customer_id?: string;
  meeting?: meetingDataAll;
  onClose = output<void>();
  private _subscription = new Subscription();
  private _serviceDoc = inject(DocumentServiceService);
  public colors!: colorsDynamic;
  private _serviceColors = inject(ColorServiceService);
  private _router = inject(Router);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);
  private _loading = inject(NxLoadingService);

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
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
          this.customer_id = value.id_customer;
          this.meeting = value.meeting;
          if (!this.customer_id) {
            this.redirectReset();
          }
        },
      })
    );
  }

  @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  signaturePadOptions = {
    minWidth: 5,
    canvasWidth: 400,
    canvasHeight: 250,
  };

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  clearSign() {
    this.signaturePad.clear();
    this.status = false;
  }

  drawComplete() {
    this.status = true;
  }

  saveSign() {
    if (!this.status) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar la firma',
      });
      return;
    }
    this._loading.view(true);
    const base64 = this.signaturePad
      .toDataURL()
      .replace('data:image/png;base64', 'data:image/jpeg;base64');
    this._subscription.add(
      this._serviceDoc
        .saveDocumentSign(
          base64,
          this.customer_id!,
          this.meeting!.meeting_id.toString()
        )
        .subscribe({
          next: (result) => {
            if (result.success) {
              this._serviceMessage.addMessage({
                type: 'success',
                message: '¡Firma guardada exitosamente!',
              });
              this._loading.view(false);
              this.onClose.emit();
            } else {
              this._serviceMessage.addMessage({
                type: 'error',
                message: 'Error en el guardado de la firma...',
              });
              this._loading.view(false);
            }
          },
          error: () => {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error en el guardado de la firma...',
            });
            this._loading.view(false);
          },
        })
    );
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }
}
