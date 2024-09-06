import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-client-unit',
  templateUrl: './client-unit.component.html',
  styleUrl: './client-unit.component.css',
})
export class ClientUnitComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  ngOnInit(): void { }

}
