import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/';
  private http = inject(HttpClient);
  constructor() { }

  public getLastMeetingSettingsByResidential(id:string):Observable<any>{
    return this.http.get(this.api+'/meeting/lastmeeting/'+id)
  }

}
