import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-form-customize-register',
  templateUrl: './form-customize-register.component.html',
  styleUrl: './form-customize-register.component.css',
})
export class CustomizeRegisterComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  viewFields = {
    emailArray: false,
    rolesFun: false,
    countUnit: false,
    form: false
  }
  ngOnInit(): void { }

}
