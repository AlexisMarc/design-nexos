import { Component, type OnInit } from '@angular/core';
import { itemsProgressBar, registerForm } from '@models';

@Component({
  selector: 'app-form-basic-values-register',
  templateUrl: './form-basic-values-register.component.html',
  styleUrl: './form-basic-values-register.component.css',
})
export class FormBasicValuesRegisterComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  options = [
    {
      label: 'Opción 1',
      value: '1',
    },
    {
      label: 'Opción 2',
      value: '2',
    },
    {
      label: 'Opción 3',
      value: '3',
    },
    {
      label: 'Opción 4',
      value: '4',
    },
  ];

  items: itemsProgressBar[] = [
    {
      status: 'success',
      title: 'Paso 1',
      description: 'Descripción',
      disabled: true,
      show: true,
    },
    {
      status: 'select',
      title: 'Paso 2',
      description: 'Descripción',
      disabled: false,
      show: true,
    },
    {
      status: 'select-success',
      title: 'Paso 3',
      description: 'Descripción',
      disabled: false,
      show: true,
    },
    {
      status: 'pending',
      title: 'Paso 4',
      disabled: false,
      show: true,
    },
    {
      status: 'loading',
      title: 'Paso 5',
      description: 'Descripción',
      disabled: false,
      show: true,
    },
  ];
  ngOnInit(): void {}
}
