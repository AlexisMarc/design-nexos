import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ReqDataEvent {
  name: string;
  status: 'active' | 'inactive';
}

interface RespData<T> {
  success: boolean;
  message: string;
  content: T;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  getEventTypes(): Observable<any> {
    return this.http.get(this.api + '/events');
  }

  getEventTypesActive(): Observable<any> {
    return this.http.get(this.api + '/events/active');
  }

  createEvent(data: ReqDataEvent): Observable<any> {
    return this.http.post(this.api + '/events/create', data);
  }

  editEvent(id:string, data: ReqDataEvent): Observable<any> {
    return this.http.post(this.api + '/events/update/'+id, data);
  }
}
