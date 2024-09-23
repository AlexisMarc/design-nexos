import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { meeting, RespData } from '@models';

export interface ReqMeetingData {
  meeting_time: string;
  email_template_id: string;
  residential_id: string;
  whatsapp_id: string;
  login_with_credentials: number;
  upload_database?: number;
  mails_to_send_documents: string;
  quality_care_selection: boolean;
  color: string;
  file?: string;
  logo?: string;
  shall_ask_representation_document: boolean;
  label_name_owner: string;
  label_name_agent: string;
  welcome_message: string;
  event_type_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class MeetingDataService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  createMeetingData(data: ReqMeetingData) {
    return this.http.post<RespData<any>>(
      this.api + '/meeting/create',
      data
    );
  }

  getMeetingDataByResident(id: string) {
    return this.http.get<RespData<meeting[]>>(
      `${this.api}/meeting/lastmeeting/${id}`
    );
  }
}
