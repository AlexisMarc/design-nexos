import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, meetingDataAll, MeetingWelcome } from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  DocumentServiceService,
} from '@services';
import { NxLoadingService } from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-qr',
  templateUrl: './client-qr.component.html',
  styleUrl: './client-qr.component.css',
})
export class ClientQrComponent implements OnInit, OnDestroy {
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  private id_customer?: string;
  private status: boolean = true;

  viewSign: boolean = true;
  values = { OneValue: 'WhatsApp', TwoValue: 'Email' };
  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _serviceDoc = inject(DocumentServiceService);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _router = inject(Router);
  private _loading = inject(NxLoadingService);

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
          //this.form_response_id = value.form_response_id;
          this.id_customer = value.id_customer;
          if (!this.meeting) {
            this.redirectReset();
            return;
          }
          this.initQr();
        },
      })
    );
  }

  private initQr() {
    this._loading.view(true);
    if(!this.id_customer) {
      this._loading.view(false);
      return;
    }
    this._subscription.add(
      this._serviceDoc.createQr(this.id_customer!).subscribe({
        next: (value) => {
          this.status = false;
          console.log(value);
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
}
