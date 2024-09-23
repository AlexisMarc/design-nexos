import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm, RespData } from '@models';

@Injectable({
  providedIn: 'root',
})
export class FormDynamicService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  getDynamicForm(id_form: string) {
    return this.http.get<RespData<RegisterForm | undefined>>(
      `${this.api}/forms/${id_form}`
    );
  }

  createDynamicForm(data: RegisterForm) {
    return this.http.post<RespData<any>>(`${this.api}/forms/create`, data);
  }
  updateDynamicForm(id: string, data: RegisterForm) {
    //const form = data.fields.map((field)=>{return {...field, form_id }})
    return this.http.put<RespData<any>>(`${this.api}/forms/edit/${id}`, {
      ...data,
      to_delete: {
        fields: [],
        options: [],
        validations: [],
      },
    });
  }
}
