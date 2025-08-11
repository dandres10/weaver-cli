import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenSaveDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@leon/infrastructure/mappers/apis/leon/injection/entities/injection-leon-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@leon/infrastructure/repositories/apis/leon/repositories/injection/entities/injection-leon-entities-repository";

export class ApiTokenSaveUseCase implements UseCase<IApiTokenSaveDTO, IApiTokenDTO | null> {
  private static instance: ApiTokenSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.ApiTokenRepository();
  private mapper = InjectionPlatformEntitiesApiTokenMapper.ApiTokenSaveMapper();

  public static getInstance(): ApiTokenSaveUseCase {
    if (!ApiTokenSaveUseCase.instance)
      ApiTokenSaveUseCase.instance = new ApiTokenSaveUseCase();
    return ApiTokenSaveUseCase.instance;
  }

  public async execute(params: IApiTokenSaveDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}