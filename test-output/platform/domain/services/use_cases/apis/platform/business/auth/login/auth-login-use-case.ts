import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/injection-platform-business-auth-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthLoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {
  private static instance: AuthLoginUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();
  private requestMapper = InjectionPlatformBusinessAuthMapper.AuthLoginRequestMapper();
  private responseMapper = InjectionPlatformBusinessAuthMapper.AuthLoginResponseMapper();

  public static getInstance(): AuthLoginUseCase {
    if (!AuthLoginUseCase.instance)
      AuthLoginUseCase.instance = new AuthLoginUseCase();
    return AuthLoginUseCase.instance;
  }

  public async execute(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null> {
    const paramsEntity = this.requestMapper.mapTo(params);
    const response = await this.repository.login(paramsEntity, config);
    return response ? this.responseMapper.mapFrom(response) : null;
  }
}