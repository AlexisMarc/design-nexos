import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespData, unit } from '@models';

export interface unitRelated {
  array_units: ArrayUnits[];
  customer_id: string;
}

export interface ArrayUnits {
  id: number;
  is_owner: number;
}

@Injectable({
  providedIn: 'root',
})
export class UnitServiceService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);
  constructor() {}

  public getUnitsByMeetingId(id: string) {
    return this.http.get<RespData<unit[]>>(`${this.api}/units/meeting/${id}`);
  }

  public getUnitsByMeetingIdByCustomer(
    meeting_id: string,
    customize_id: number
  ) {
    return this.http.get<RespData<unit[]>>(
      `${this.api}/units/meeting/${meeting_id}/${customize_id}`
    );
  }

  public saveRelateUnit(data: unitRelated) {
    return this.http.put<RespData<any>>(
      `${this.api}/units/save-relation`,
      data
    );
  }
}
