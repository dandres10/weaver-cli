export interface ILocationSaveEntity {
  company_id?: string;
  country_id?: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  main_location?: boolean;
  state?: boolean;
}