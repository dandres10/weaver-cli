import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/injection-platform-business-auth-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthCreateApiTokenUseCase implements UseCase<IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO | null> {
  private static instance: AuthCreateApiTokenUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();
  private requestMapper = InjectionPlatformBusinessAuthMapper.AuthCreateApiTokenRequestMapper();
  private responseMapper = InjectionPlatformBusinessAuthMapper.AuthCreateApiTokenResponseMapper();

  public static getInstance(): AuthCreateApiTokenUseCase {
    if (!AuthCreateApiTokenUseCase.instance)
      AuthCreateApiTokenUseCase.instance = new AuthCreateApiTokenUseCase();
    return AuthCreateApiTokenUseCase.instance;
  }

  public async execute(params: IAuthCreateApiTokenRequestDTO, config?: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null> {
    const paramsEntity = this.requestMapper.mapTo(params);
    const response = await this.repository.create-api-token(paramsEntity, config);
    return response ? this.responseMapper.mapFrom(response) : null;
  }
}