import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nx-header',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, RouterLink],
  templateUrl: './nx-header.component.html',
  styleUrl: './nx-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxHeaderComponent implements OnInit {
  public listBreadcrumbs = [
    {
      name: 'Module',
      url: '/',
    },
    {
      name: 'Module',
      url: '/',
    },
  ];
  ngOnInit(): void {}
}
