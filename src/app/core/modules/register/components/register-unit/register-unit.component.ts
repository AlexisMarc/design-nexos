import { Component } from '@angular/core';
import { unit } from '@models';

@Component({
  selector: 'register-unit',
  templateUrl: './register-unit.component.html',
  styleUrl: './register-unit.component.css',
})
export class RegisterUnitComponent {
  data: unit[] = [];
}
