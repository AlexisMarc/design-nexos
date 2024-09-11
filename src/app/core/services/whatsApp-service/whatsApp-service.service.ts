import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespData, whatsAppTemplate } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppServiceService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  public getTemplateWhatsApp(): Observable<RespData<whatsAppTemplate[]>> {
    return this.http.get(
      this.api + '/voting/whatsapp/active'
    ) as Observable<RespData<whatsAppTemplate[]>>;
  }
}
