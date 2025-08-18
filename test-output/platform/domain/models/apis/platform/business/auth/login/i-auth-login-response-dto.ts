export interface IAuthLoginResponseDTO {
  platformConfiguration: PlatformConfigurationResponseDTO;
  platformVariations: PlatformVariationsResponseDTO;
  token: string;
}