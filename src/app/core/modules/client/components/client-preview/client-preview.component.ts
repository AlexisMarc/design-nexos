import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore, MeetingWelcome } from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  MeetingDataService,
} from '@services';
import { NxLoadingService, NxToastService } from '@shared';
import { DataMeetingAll, DataWelcome } from '@store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-preview',
  templateUrl: './client-preview.component.html',
  styleUrl: './client-preview.component.css',
})
export class ClientPreviewComponent implements OnInit, OnDestroy {
  public welcome: MeetingWelcome | undefined;
  public colors!: colorsDynamic;
  private _ActivatedRouter = inject(ActivatedRoute);
  private _router = inject(Router);
  private _subscription = new Subscription();
  private _serviceMeeting = inject(MeetingDataService);
  private _loading = inject(NxLoadingService);
  private _serviceColors = inject(ColorServiceService);
  private idMeeting = 0;
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';
  private dest: number = new Date().getTime();
  private intervalId: any;
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);

  ngOnInit(): void {
    this._loading.view(true);
    this.initSubscription();
    this.initData();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private initData() {
    if (!this.idMeeting || this.welcome) {
      this._loading.view(false);
      return;
    }
    this._subscription.add(
      this._serviceMeeting.getWelcomeByMeetingId(this.idMeeting).subscribe({
        next: (value) => {
          if (value.success) {
            this._loading.view(false);
            this._store.dispatch(DataWelcome({ data: value }));
            return;
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar los datos del evento...',
          });
          this._loading.view(false);
        },
      })
    );
  }

  private initSubscription() {
    this._subscription.add(
      this._ActivatedRouter.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id') ?? sessionStorage.getItem('meeting_id');
          if (id) {
            this.idMeeting = Number(id);
            sessionStorage.setItem('meeting_id', id);
          } else this.idMeeting = 0;
        },
      })
    );
    this._subscription.add(
      this._store.select('clientRegister').subscribe({
        next: (value) => {
          this.welcome = structuredClone(value.welcome);
          if (this.welcome) {
            this._serviceColors.setDynamicColors(this.welcome.color);
            this.startCountdown(this.welcome.meeting_time);
          }
        },
      })
    );
    this._subscription.add(
      this._serviceColors.messages$.subscribe({
        next: (colors) => {
          this.colors = { ...colors };
        },
      })
    );
  }

  private startCountdown(time: string) {
    const now = new Date().getTime();
    this.dest = new Date(time).getTime();

    const diff = this.dest - now;

    if (diff <= 0) {
      this.dest = new Date().getTime() + 10000;
    }

    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const diff = this.dest - now;
      if (diff <= 0) {
        clearInterval(this.intervalId);
        if (this.welcome)
          this.initEvent(this.welcome.residential_id.toString());
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      this.days = days < 10 ? `0${days}` : `${days}`;
      this.hours = hours < 10 ? `0${hours}` : `${hours}`;
      this.minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      this.seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    }, 1000);
  }

  private initEvent(residential_id: string) {
    this._loading.view(true);
    this._serviceMeeting.getMeetingDataByResident(residential_id).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.content && data.content.length) {
            const meeting = data.content[data.content.length - 1];
            this._loading.view(false);
            this._store.dispatch(DataMeetingAll({ data: meeting }));
            this.redirectPages();
          } else {
            this._serviceMessage.addMessage({
              type: 'warning',
              message: 'Sin la información del evento...',
            });
          }
          this._loading.view(false);
        } else {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar la información del evento...',
          });
        }
      },
    });
  }

  private async redirectPages() {
    await this._router.navigate(['client/login']);
  }
}
