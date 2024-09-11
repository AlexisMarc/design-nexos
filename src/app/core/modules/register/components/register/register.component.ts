import { AppStore, basicValue, itemsProgressBar, resident } from '@models';
import { Component, inject, OnInit } from '@angular/core';
import { NxToastService } from '@shared';
import { EmailService, WhatsAppServiceService } from '@services';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataResident, DataTemplate } from '@store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  selectedSection: number = 0;
  items: itemsProgressBar[] = [
    {
      status: 'select',
      title: 'Configuración',
      disabled: false,
      show: true,
    },
    {
      status: 'pending',
      title: 'Personalización',
      disabled: false,
      show: true,
    },
    {
      status: 'pending',
      title: 'Diseño',
      disabled: false,
      show: true,
    },
    {
      status: 'pending',
      title: 'Unidades',
      disabled: false,
      show: true,
    },
  ];

  resident?: resident;

  private _subscription = new Subscription();
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceEmail = inject(EmailService);
  private _serviceWhatsApp = inject(WhatsAppServiceService);
  private _serviceMessage = inject(NxToastService);

  ngOnInit(): void {
    this.initData();
  }

  selectSection(index: number) {
    this.items[this.selectedSection].status = 'pending';
    this.items[index].status = 'select';
    this.selectedSection = index;
  }

  initData() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value) {
            this.resident = value.residential;
            console.log(value.residential);
          }
        },
        error: () => {},
      })
    );

    this._subscription.add(
      this._serviceEmail.getTemplateEmail().subscribe({
        next: (value) => {
          if (value.success) {
            if (value.content && value.content.length) {
              const list = value.content.map((value) => {
                return { label: value.name_email, value: value.id.toString() };
              });
              this.saveTemplate(list, 'email');
            }
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Ocurrió un error al consultar las platillas de email',
              life: 5000,
            });
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar plantillas de email',
          });
        },
      })
    );

    this._subscription.add(
      this._serviceWhatsApp.getTemplateWhatsApp().subscribe({
        next: (value) => {
          if (value.success) {
            if (value.content && value.content.length) {
              const list = value.content.map((value) => {
                return {
                  label: value.name_content,
                  value: value.id.toString(),
                };
              });
              this.saveTemplate(list, 'whatsApp');
            }
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message:
                'Ocurrió un error al consultar las platillas de whatsApp',
              life: 5000,
            });
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar plantillas de WhatsApp',
          });
        },
      })
    );
  }

  private saveTemplate(list: basicValue[], type: 'whatsApp' | 'email') {
    this._store.dispatch(
      DataTemplate({
        data: { list, type },
      })
    );
  }

  setResident(resident: resident | undefined) {
    this._store.dispatch(DataResident({ resident }));
  }
}
