import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nx-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgScrollbarModule],
  templateUrl: './nx-sidebar.component.html',
  styleUrl: './nx-sidebar.component.css',
})
export class NxSidebarComponent implements OnInit {
  public expand: boolean = false;
  ngOnInit(): void {}
}
