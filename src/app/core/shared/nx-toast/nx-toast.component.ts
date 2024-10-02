import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NxToastService } from './nx-toast.service';

export interface toastMessage {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  life?: number;
}

@Component({
  selector: 'nx-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-toast.component.html',
  styleUrl: './nx-toast.component.css',
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
export class NxToastComponent implements OnInit {
  _service = inject(NxToastService);
  public list: toastMessage[] = [];
  ngOnInit() {
    this._service.messages$.subscribe({
      next: (value) => {
        this.list = [...value];
      },
    });
  }

  remove(index:number){
    this._service.removeMessage(index);
  }
}
