import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { events, RespData } from '@models';
import { Observable } from 'rxjs';

interface ReqDataEvent {
  name: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  getEventTypes() {
    return this.http.get<RespData<events>>(this.api + '/events');
  }

  getEventTypesActive() {
    return this.http.get<RespData<events>>(this.api + '/events/active');
  }

  createEvent(data: ReqDataEvent) {
    return this.http.post<RespData<string>>(this.api + '/events/create', data);
  }

  editEvent(id:string, data: ReqDataEvent){
    return this.http.post<RespData<string>>(this.api + '/events/update/'+id, data);
  }
}
