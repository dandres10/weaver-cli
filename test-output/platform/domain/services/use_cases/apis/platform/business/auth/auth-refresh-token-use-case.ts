import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthRefreshTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";

import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthRefreshTokenUseCase implements UseCase<void, IAuthRefreshTokenResponseDTO | null> {
  private static instance: AuthRefreshTokenUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();

  public static getInstance(): AuthRefreshTokenUseCase {
    if (!AuthRefreshTokenUseCase.instance)
      AuthRefreshTokenUseCase.instance = new AuthRefreshTokenUseCase();
    return AuthRefreshTokenUseCase.instance;
  }

  public async execute(config?: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null> {
    return await this.repository.refreshToken(config).then((data) => data ?? null);
}