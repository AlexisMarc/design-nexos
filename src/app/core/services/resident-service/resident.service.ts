import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private api = 'https://apiasambleas.grupogift.com';
  private http = inject(HttpClient);
  constructor() {}

  public getAllResidentialByParam(
    value: string,
    quoteTypeId: number
  ): Observable<any> {
    return this.http.get(
      `${
        this.api
      }/app-management/ResidentialServices/getAllResidentialByParam?key=${'GiUBniR9UtmfKDaeOc9tXKt16lk='}&param=${value}&quote_type_id=${quoteTypeId}`
    );
  }
}
