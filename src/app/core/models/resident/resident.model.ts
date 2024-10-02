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
  name: string;
  meeting_id: number;
  meeting_time: string;
  email_template_id: string;
  whatsapp_id: string;
  login_with_credentials: boolean;
  upload_database: boolean;
  event_type_id: number;
}

export interface meetingSettings {
  mails_to_send_documents?: string;
  shall_ask_representation_document: number;
  label_name_owner: string;
  label_name_agent: string;
  limit_raising_by_customer: number;
  color: string;
  welcome_message: string;
  quality_care_selection: number;
  signature_module: number;
  authority_granted: number;
}

export interface MeetingWelcome {
  success: boolean;
  residential_id: number;
  meeting_name: string;
  meeting_time: string;
  welcome_message: string;
  color: string;
  logo: string | null;
  residential_name: string;
  content_type: string | null;
  event_type_name: string;
}

export interface meetingDataAll extends meeting, meetingSettings {}

export interface events {
  id: number;
  name: string;
  status: 'active' | 'inactive';
}

export interface unit {
  id: number
  name: string;
  number: string;
  created_at: string;
  updated_at: string;
  building_id: number;
  coefficient: string;
  aporte: string;
  validation_user: string;
  validation_password: string;
  voter_profile_id: number;
  can_vote: number;
  meeting_id: number;
}
