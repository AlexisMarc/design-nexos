import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toastMessage } from './nx-toast.component';

@Injectable({
  providedIn: 'root'
})
export class NxToastService {
  private messageSubject = new BehaviorSubject<toastMessage[]>([]);
  messages$ = this.messageSubject.asObservable();

  constructor() { }

  addMessage(message: toastMessage) {
    const currentMessages = this.messageSubject.value;
    const updatedMessages = [...currentMessages, message];
    this.messageSubject.next(updatedMessages);

    setTimeout(() => {
      this.removeMessage(0);
    }, message.life || 3000);
  }

  removeMessage(index: number) {
    const currentMessages = this.messageSubject.value;
    currentMessages.splice(index, 1);
    this.messageSubject.next([...currentMessages]);
  }
}
