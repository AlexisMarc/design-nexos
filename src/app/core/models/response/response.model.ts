import { RegisterForm } from "@models";

export interface RespData<T> {
    success: boolean;
    message: string;
    event_id?: number;
    meeting_id?: number; 
    id_customer:number; 
    content: T;
    form?: RegisterForm;
    task_queu_id: number;
    form_response_id: number
    url_pdf: string
    pdf_base64: string
  }

  export interface RespAuth {
    id: string;
    name: string;
    status_id: string;
    email: string;
    photo: string;
    profile_id:string;
    profile: string;
    token: string;
  }