import { AuthEntityMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/auth-entity-mapper";
import { AuthSaveMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/auth-save-mapper";
import { AuthReadMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/auth-read-mapper";
import { AuthUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/auth-update-mapper";
import { AuthDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/auth-delete-mapper";

export class InjectionPlatformBusinessAuthMapper {
  private static instance: InjectionPlatformBusinessAuthMapper;

  public static getInstance(): InjectionPlatformBusinessAuthMapper {
    if (!InjectionPlatformBusinessAuthMapper.instance)
      InjectionPlatformBusinessAuthMapper.instance = new InjectionPlatformBusinessAuthMapper();
    return InjectionPlatformBusinessAuthMapper.instance;
  }

  public static AuthEntityMapper(): AuthEntityMapper {
    return AuthEntityMapper.getInstance();
  }

  public static AuthSaveMapper(): AuthSaveMapper {
    return AuthSaveMapper.getInstance();
  }

  public static AuthReadMapper(): AuthReadMapper {
    return AuthReadMapper.getInstance();
  }

  public static AuthUpdateMapper(): AuthUpdateMapper {
    return AuthUpdateMapper.getInstance();
  }

  public static AuthDeleteMapper(): AuthDeleteMapper {
    return AuthDeleteMapper.getInstance();
  }
}