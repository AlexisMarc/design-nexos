import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);
  
  constructor() { }

  public EmailActive(): Observable<any> {
    return this.http.get(this.api+'/email/list/active')
  }
}
