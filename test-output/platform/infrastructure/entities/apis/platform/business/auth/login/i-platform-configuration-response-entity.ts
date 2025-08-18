export interface IPlatformConfigurationResponseEntity {
  user: IUserLoginResponseEntity;
  currency: ICurrencyLoginResponseEntity;
  location: ILocationLoginResponseEntity;
  language: ILanguageLoginResponseEntity;
  platform: IPlatformLoginResponseEntity;
  country: ICountryLoginResponseEntity;
  company: ICompanyLoginResponseEntity;
  rol: IRolLoginResponseEntity;
  permissions: IPermissionLoginResponseEntity[];
  menu: IMenuLoginResponseEntity[];
}