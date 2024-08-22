import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NxHeaderComponent, NxSidebarComponent } from '@shared';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    NxSidebarComponent,
    NxHeaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void { }

}
