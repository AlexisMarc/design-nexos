import { basicValue, itemsProgressBar, resident } from '@models';
import { Component, inject, OnInit } from '@angular/core';
import { NxToastService } from '@shared';
import { EmailService } from '@services';
import { Subscription } from 'rxjs';

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
  templateEmail: basicValue[] = [];

  private _subscription = new Subscription();
  private _serviceEmail = inject(EmailService);
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
      this._serviceEmail.getTemplateEmail().subscribe({
        next: (value) => {
          this._serviceMessage.addMessage({
            type: 'success',
            message: 'Plantillas consultadas',
          });
          if (value && value.length) {
            this.templateEmail = value.map((value) => {
              return { label: value.name_email, value: value.id.toString() };
            });
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar plantillas consultadas',
          });
        },
      })
    );
  }
}
