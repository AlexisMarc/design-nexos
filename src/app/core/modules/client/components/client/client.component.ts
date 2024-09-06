import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  ngOnInit(): void { }

}
