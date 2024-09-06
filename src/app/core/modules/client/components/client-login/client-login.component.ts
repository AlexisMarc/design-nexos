import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css',
})
export class ClientLoginComponent implements OnInit {
  public requerid: boolean = false;
  values = { OneValue: true, TwoValue: false };
  ngOnInit(): void { }

}
