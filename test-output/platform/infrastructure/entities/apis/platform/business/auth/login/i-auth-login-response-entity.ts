export interface IAuthLoginResponseEntity {
  platform_configuration: IPlatformConfigurationEntity;
  platform_variations: IPlatformVariationsEntity;
  token: string;
}

export interface PlatformConfigurationEntity {
  user: UserLoginResponseEntity;
  currency: CurrencyLoginResponseEntity;
  location: LocationLoginResponseEntity;
  language: LanguageLoginResponseEntity;
  platform: PlatformLoginResponseEntity;
  country: CountryLoginResponseEntity;
  company: CompanyLoginResponseEntity;
  rol: RolLoginResponseEntity;
  permissions: PermissionLoginResponseEntity[];
  menu: MenuLoginResponseEntity[];
}

export interface UserLoginResponseEntity {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  state: boolean;
}

export interface CurrencyLoginResponseEntity {
  id: string;
  name: string;
  code: string;
  symbol: string;
  state: boolean;
}

export interface LocationLoginResponseEntity {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  main_location: boolean;
  state: boolean;
}

export interface LanguageLoginResponseEntity {
  id: string;
  name: string;
  code: string;
  native_name: string;
  state: boolean;
}

export interface PlatformLoginResponseEntity {
  id: string;
  language_id: string;
  location_id: string;
  token_expiration_minutes: number;
  currency_id: string;
}

export interface CountryLoginResponseEntity {
  id: string;
  name: string;
  code: string;
  phone_code: string;
  state: boolean;
}

export interface CompanyLoginResponseEntity {
  id: string;
  name: string;
  inactivity_time: number;
  nit: string;
  state: boolean;
}

export interface RolLoginResponseEntity {
  id: string;
  name: string;
  code: string;
  description: string;
  state: boolean;
}

export interface PermissionLoginResponseEntity {
  id: string;
  name: string;
  description: string;
  state: boolean;
}

export interface MenuLoginResponseEntity {
  id: string;
  name: string;
  label: string;
  description: string;
  top_id: string;
  route: string;
  state?: boolean;
  icon: string;
}

export interface PlatformVariationsEntity {
  currencies: CurrencyLoginResponseEntity[];
  locations: LocationLoginResponseEntity[];
  languages: LanguageLoginResponseEntity[];
  companies: CompanyLoginResponseEntity[];
}
