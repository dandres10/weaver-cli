export interface IPlatformConfigurationResponseDTO {
  user: UserLoginResponseDTO;
  currency: CurrencyLoginResponseDTO;
  location: LocationLoginResponseDTO;
  language: LanguageLoginResponseDTO;
  platform: PlatformLoginResponseDTO;
  country: CountryLoginResponseDTO;
  company: CompanyLoginResponseDTO;
  rol: RolLoginResponseDTO;
  permissions: PermissionLoginResponseDTO[];
  menu: MenuLoginResponseDTO[];
}