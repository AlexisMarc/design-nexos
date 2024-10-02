import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  messageConfirmDialog,
  NxConfirmDialogService,
} from './nx-confirm-dialog.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'nx-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-confirm-dialog.component.html',
  styleUrl: './nx-confirm-dialog.component.css',
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
export class NxConfirmDialogComponent implements OnInit {
  private _service = inject(NxConfirmDialogService);
  message?: messageConfirmDialog;
  ngOnInit(): void {
    this._service.messages$.subscribe({
      next: (value) => {
        this.message = value;
      },
    });
  }

  clickButton(type: 'primary' | 'secondary' | 'tertiary') {
    switch (type) {
      case 'primary':
        this.message?.next();
        break;
      case 'secondary':
        const cancel = this.message?.cancel;
        if (cancel) cancel();
        break;
      case 'tertiary':
        const exit = this.message?.exit;
        if (exit) exit();
        break;
      default:
        break;
    }
    this._service.clearConfirmDialog();
  }
}
