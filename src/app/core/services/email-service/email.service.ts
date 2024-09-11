import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { emailTemplate } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  public EmailActive(): Observable<any> {
    return this.http.get(this.api + '/email/list/active');
  }

  public getTemplateEmail(): Observable<emailTemplate[]> {
    return this.http.get(
      'https://apiasambleas.grupoempresarialnexos.com/app-preregistro/ApiEmailContent/getAllEmailContent?key=GiUBniR9UtmfKDaeOc9tXKt16lk=&user_id=49'
    ) as Observable<emailTemplate[]>;
  }
}
