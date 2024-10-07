import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespData, whatsAppTemplate } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppServiceService {
  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/management/api';
  private http = inject(HttpClient);

  constructor() {}

  public getTemplateWhatsApp(): Observable<RespData<whatsAppTemplate[]>> {
    return this.http.get(
      this.api + '/voting/whatsapp/active'
    ) as Observable<RespData<whatsAppTemplate[]>>;
  }
}
