import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespData } from '@models';

@Injectable({
  providedIn: 'root',
})
export class DocumentServiceService {
  private api = 'https://s84lfjkm-8000.use2.devtunnels.ms/management/api';
  private http = inject(HttpClient);

  cutImage(data: {
    width: number;
    height: number;
    image: string;
    points: number[][];
  }) {
    return this.http.post<any>(
      `${this.api}/meeting/documentImageCropping`,
      data
    );
  }

  saveDocumentSign(signature: string, customer_id: string, meeting_id: string) {
    return this.http.post<RespData<any>>(`${this.api}/units/save-signature`, {
      signature,
      customer_id,
      meeting_id,
    });
  }

  saveDocumentCertificate(
    documents: string[],
    customer_id: string,
    meeting_id: string
  ) {
    return this.http.post<RespData<any>>(`${this.api}/units/save-documents`, {
      documents,
      customer_id,
      meeting_id,
    });
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  createQr(id_customer: string) {
    return this.http.post<
      RespData<{ nombre: string; img: string; documento: string }[]>
    >(`${this.api}/qr/create/${id_customer}`, {});
  }

  sentQr(
    task_queu_id: number,
    data: {
      task_destination: string;
      task_addressee: string;
    }
  ) {
    return this.http.put<RespData<void>>(
      `${this.api}/qr/update/${task_queu_id}`,
      data
    );
  }

  createPdfQr(
    task_queu_id: number
  ) {
    return this.http.post<RespData<void>>(
      `${this.api}/qr/create/pdf/${task_queu_id}`,
      {}
    );
  }

  downloadPDF(url: string) {
    return this.http.get<Blob>(url);
  }
}
