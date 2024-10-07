import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespData } from '@models';

@Injectable({
  providedIn: 'root',
})
export class DocumentServiceService {
  private api = 'https://1ztx4msj-8000.use2.devtunnels.ms/management/api';
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
      RespData<
        { nombre: string; img: string; documento: string; unidad: string }[]
      >
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

  createPdfQr(task_queu_id: number) {
    return this.http.post<RespData<void>>(
      `${this.api}/qr/create/pdf/${task_queu_id}`,
      {}
    );
  }

  downloadBase64PDF(base64: string, filename: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  printBase64PDF(base64: string) {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      iframe.onload = function () {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      };
    } catch (error) {
      console.error('Error al intentar imprimir el archivo PDF:', error);
    }
  }
}
