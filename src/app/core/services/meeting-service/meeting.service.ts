import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private api = 'http://127.0.0.1:8000/';
  private http = inject(HttpClient);
  constructor() { }

  public getLastMeetingSettingsByResidential():Observable<any>{
    return this.http.get(this.api+'/meeting/lastmeeting')
  }

}
