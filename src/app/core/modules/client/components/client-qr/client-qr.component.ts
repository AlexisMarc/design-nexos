import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-client-qr',
  templateUrl: './client-qr.component.html',
  styleUrl: './client-qr.component.css',
})
export class ClientQrComponent implements OnInit {
  values = { OneValue: 'WhatsApp', TwoValue: 'Email' };
  ngOnInit(): void {}
}
