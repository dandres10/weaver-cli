import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthLogoutResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLogoutMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-logout-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthLogoutUseCase implements UseCase<void, IAuthLogoutResponseDTO | null> {
  private static instance: AuthLogoutUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();
  private mapper = InjectionPlatformBusinessAuthLogoutMapper.AuthLogoutResponseMapper();

  public static getInstance(): AuthLogoutUseCase {
    if (!AuthLogoutUseCase.instance)
      AuthLogoutUseCase.instance = new AuthLogoutUseCase();
    return AuthLogoutUseCase.instance;
  }

  public async execute(config?: IConfigDTO): Promise<IAuthLogoutResponseDTO | null> {
    return await this.repository.logout(config).then((data) => data ?? null);
  }
}