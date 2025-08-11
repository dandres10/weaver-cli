import { IConfigDTO } from "@bus/core/interfaces";
import {
  IApiTokenDTO,
  IApiTokenDeleteDTO,
  IApiTokenReadDTO,
  IApiTokenSaveDTO,
  IApiTokenUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/apitoken";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesApiTokenUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-api-token-use-case";

export class ApiTokenFacade {
  private static instance: ApiTokenFacade;

  private readonly readUseCase = InjectionPlatformEntitiesApiTokenUseCase.ApiTokenReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesApiTokenUseCase.ApiTokenSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesApiTokenUseCase.ApiTokenUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesApiTokenUseCase.ApiTokenDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesApiTokenUseCase.ApiTokenListUseCase();

  public static getInstance(): ApiTokenFacade {
    if (!ApiTokenFacade.instance)
      ApiTokenFacade.instance = new ApiTokenFacade();
    return ApiTokenFacade.instance;
  }

  public async read(params: IApiTokenReadDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IApiTokenSaveDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IApiTokenUpdateDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IApiTokenDeleteDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IApiTokenDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}