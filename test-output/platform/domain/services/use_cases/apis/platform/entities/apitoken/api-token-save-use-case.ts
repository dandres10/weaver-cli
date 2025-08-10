import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenSaveDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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