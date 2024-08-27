import { Injectable } from '@angular/core';
import { RespAuth } from '@models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public setClient(data: RespAuth) {
    sessionStorage.setItem('user', JSON.stringify(data));
  }
}
