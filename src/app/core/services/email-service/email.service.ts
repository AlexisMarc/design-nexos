import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { emailTemplate, RespData } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/management/api';
  private http = inject(HttpClient);

  constructor() {}

  public EmailActive(): Observable<any> {
    return this.http.get(this.api + '/email/list/active');
  }

  public getTemplateEmail() {
    return this.http.get<RespData<emailTemplate[]>>(
      this.api + '/email/list/actives'
    );
  }

  public sendEmail(data: {email: string, file_path: string}) {
    const file_name = data.file_path.split('/').at(-1);
    return this.http.post<RespData<emailTemplate[]>>(
      this.api + '/qr/sendEmail', {...data, file_name}
    );
  }
}
