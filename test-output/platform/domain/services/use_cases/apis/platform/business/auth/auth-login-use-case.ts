import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthLoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {
  private static instance: AuthLoginUseCase;
  private repository = InjectionPlatformBusinessRepository.AuthRepository();
  private mapper = InjectionPlatformBusinessAuthLoginMapper.AuthLoginRequestMapper();

  public static getInstance(): AuthLoginUseCase {
    if (!AuthLoginUseCase.instance)
      AuthLoginUseCase.instance = new AuthLoginUseCase();
    return AuthLoginUseCase.instance;
  }

  public async execute(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.login(paramsEntity, config).then((data) => data ?? null);
}