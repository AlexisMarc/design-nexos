import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-client-certificate',
  templateUrl: './client-certificate.component.html',
  styleUrl: './client-certificate.component.css',
})
export class ClientCertificateComponent implements OnInit {
  values = { TwoValue: 'Entregado', OneValue: 'Entrega después' };
  ngOnInit(): void {}
}
