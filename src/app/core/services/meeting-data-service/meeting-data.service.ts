import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { meetingDataAll, MeetingWelcome, RespData } from '@models';

export interface ReqMeetingData {
  name: string;
  meeting_time: string;
  email_template_id: string;
  residential_id: string;
  whatsapp_id: string;
  login_with_credentials: number;
  limit_raising_by_customer: number;
  upload_database?: number;
  mails_to_send_documents: string;
  quality_care_selection: number;
  color: string;
  file?: string;
  logo?: string;
  shall_ask_representation_document: number;
  label_name_owner: string;
  label_name_agent: string;
  welcome_message: string;
  event_type_id?: number;
  signature_module: number;
  authority_granted: number;
  user_id?: number
}

export interface loginMeeting {
  document_number?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeetingDataService {
  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/management/api';
  private http = inject(HttpClient);

  constructor() {}

  createMeetingData(data: ReqMeetingData) {
    return this.http.post<RespData<void>>(this.api + '/meeting/create', {...data, user_id:   328
    });
  }

  editMeetingData(data: ReqMeetingData, id: number) {
    return this.http.put<RespData<any>>(
      `${this.api}/meeting/update/${id}`,
      data
    );
  }

  getMeetingDataByResident(id: string) {
    return this.http.get<RespData<meetingDataAll[]>>(
      `${this.api}/meeting/lastmeeting/${id}`
    );
  }

  getWelcomeByMeetingId(id:number) {
    return this.http.get<MeetingWelcome>(
      `${this.api}/meeting/welcome/${id}`
    );
  }

  loginMeeting(data: loginMeeting){
    return this.http.post<RespData<any>>(this.api + '/meeting/Verifylogin', data);
  }
}
