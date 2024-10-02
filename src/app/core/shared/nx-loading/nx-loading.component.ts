import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NxLoadingService } from '@shared';

@Component({
  selector: 'nx-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-loading.component.html',
  styleUrl: './nx-loading.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NxLoadingComponent implements OnInit {
  public view: boolean = false;
  private _service = inject(NxLoadingService);

  ngOnInit(): void {
    this._service.loading$.subscribe({
      next: (view) => {
        this.view = view;
      },
    });
  }
}
