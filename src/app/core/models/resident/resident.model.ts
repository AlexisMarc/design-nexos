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
