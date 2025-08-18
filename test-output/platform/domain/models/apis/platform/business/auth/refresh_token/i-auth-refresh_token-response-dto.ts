export interface IAuthRefreshTokenResponseDTO {
  platformConfiguration: PlatformConfigurationResponseDTO;
  platformVariations: PlatformVariationsResponseDTO;
  token: string;
}