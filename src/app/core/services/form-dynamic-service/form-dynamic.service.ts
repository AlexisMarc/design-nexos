import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm, RespData } from '@models';

@Injectable({
  providedIn: 'root',
})
export class FormDynamicService {
  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/management/api';
  private http = inject(HttpClient);

  constructor() {}

  getDynamicForm(meeting_id: number) {
    return this.http.get<RespData<RegisterForm | undefined>>(
      `${this.api}/forms/${meeting_id}`
    );
  }

  createDynamicForm(data: RegisterForm) {
    return this.http.post<RespData<any>>(`${this.api}/forms/create`, data);
  }

  updateDynamicForm(id: number, data: RegisterForm) {
    return this.http.put<RespData<any>>(`${this.api}/forms/edit/${id}`, {
      ...data,
      to_delete: {
        fields: [],
        options: [],
        validations: [],
      },
    });
  }

  createFormResponse(data: any){
    return this.http.post<RespData<any>>(
      `${this.api}/forms/formResponse/create`, data
    );
  }
}
