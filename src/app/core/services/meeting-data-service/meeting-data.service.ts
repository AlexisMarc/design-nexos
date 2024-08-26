import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ReqMeetingData {
  meeting_time: string;
  email_template_id: number;
  residential_id: number;
  whatsapp_id: number;
  login_with_credentials: number;
  upload_database: number;
  file?: string
}

@Injectable({
  providedIn: 'root',
})
export class MeetingDataService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  createMeetingData(data: ReqMeetingData): Observable<any> {
    return this.http.post(this.api + '/meetingdata/create', data);
  }
}
