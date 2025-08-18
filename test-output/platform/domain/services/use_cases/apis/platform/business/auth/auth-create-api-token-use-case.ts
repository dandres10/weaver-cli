import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthCreateApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-create-api-token-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthCreateApiTokenUseCase implements UseCase<IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO | null> {
  private static instance: AuthCreateApiTokenUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();
  private mapper = InjectionPlatformBusinessAuthCreateApiTokenMapper.AuthCreateApiTokenRequestMapper();

  public static getInstance(): AuthCreateApiTokenUseCase {
    if (!AuthCreateApiTokenUseCase.instance)
      AuthCreateApiTokenUseCase.instance = new AuthCreateApiTokenUseCase();
    return AuthCreateApiTokenUseCase.instance;
  }

  public async execute(params: IAuthCreateApiTokenRequestDTO, config?: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.createApiToken(paramsEntity, config).then((data) => data ?? null);
}