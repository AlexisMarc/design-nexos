import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ReqDataEvent {
  name: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private api = 'https://2x7p7hg4-8000.use2.devtunnels.ms/management/api';
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
