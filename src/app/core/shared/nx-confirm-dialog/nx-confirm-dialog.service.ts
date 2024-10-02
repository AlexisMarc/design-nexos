import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface messageConfirmDialog {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  buttons: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  next: () => void;
  cancel?: () => void;
  exit?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class NxConfirmDialogService {
  private messageSubject = new BehaviorSubject<
    messageConfirmDialog | undefined
  >(undefined);
  messages$ = this.messageSubject.asObservable();

  constructor() {}

  addConfirmDialog(message: messageConfirmDialog) {
    this.messageSubject.next(message);
  }

  clearConfirmDialog() {
    this.messageSubject.next(undefined);
  }
}
