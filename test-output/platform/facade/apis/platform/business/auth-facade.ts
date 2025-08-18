import { IConfigDTO } from "@bus/core/interfaces";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO, IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { AuthLoginUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/login/auth-login-use-case";
import { AuthCreateApiTokenUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/create-api-token/auth-create-api-token-use-case";

export class AuthFacade {
  private static instance: AuthFacade;

  public static getInstance(): AuthFacade {
    if (!AuthFacade.instance)
      AuthFacade.instance = new AuthFacade();
    return AuthFacade.instance;
  }

  public async login(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null> {
    return await this.loginUseCase.execute(params, config);
  }

  private loginUseCase = AuthLoginUseCase.getInstance();

  public async create-api-token(params: IAuthCreateApiTokenRequestDTO, config?: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null> {
    return await this.create-api-tokenUseCase.execute(params, config);
  }

  private create-api-tokenUseCase = AuthCreateApiTokenUseCase.getInstance();
}