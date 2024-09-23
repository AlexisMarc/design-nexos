export interface resident {
  id: string;
  name: string;
  status_id: string;
  description?: string | null;
  schedule?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  uuid_code: string;
  latitude?: number | null;
  longitude?: number | null;
  created_at: string;
  updated_at: string;
  email: string;
  phone: string;
  website: string;
  nit: string;
  address: string;
  city_id: string;
  total_properties: string;
  administrator?: adminResident;
  last_hired_quote: any[];
  last_not_hired_quote: any[];
}

export interface adminResident {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface meeting {
  meeting_id: number;
  meeting_time: string;
  email_template_id: string;
  whatsapp_id: string;
  login_with_credentials: boolean;
  upload_database: boolean;
}

export interface meetingSettings {
  shall_ask_representation_document: boolean;
  label_name_owner: string;
  label_name_agent: string;
  limit_raising_by_customer: number;
  color: string;
  welcome_message: string;
}

export interface meetingDataAll extends meeting, meetingSettings {}

export interface events {
  name: string,
  status: string,
}