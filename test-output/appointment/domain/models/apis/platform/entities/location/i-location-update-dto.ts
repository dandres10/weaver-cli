export interface ILocationUpdateDTO {
  id: string;
  companyId?: string;
  countryId?: string;
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  mainLocation?: boolean;
  state?: boolean;
}