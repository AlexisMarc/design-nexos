import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ReqAuth {
  email: string;
  password: string;
  source: 'gestor';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'https://apiasambleas.grupoempresarialnexos.com/gestor-v2/api';
  private http = inject(HttpClient);

  Authentication(data: ReqAuth): Observable<any> {
    return this.http.post(this.api + '/users/login', JSON.stringify(data));
  }
}
