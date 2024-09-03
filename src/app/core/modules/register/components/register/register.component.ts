import { itemsProgressBar, resident } from '@models';
import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {}

  selectSection(index: number) {
    this.items[this.selectedSection].status = 'pending';
    this.items[index].status = 'select';
    this.selectedSection = index;
  }
}
