import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenDeleteDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@leon/infrastructure/mappers/apis/leon/injection/entities/injection-leon-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@leon/infrastructure/repositories/apis/leon/repositories/injection/entities/injection-leon-entities-repository";

export class ApiTokenDeleteUseCase implements UseCase<IApiTokenDeleteDTO, IApiTokenDTO | null> {
  private static instance: ApiTokenDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.ApiTokenRepository();
  private mapper = InjectionPlatformEntitiesApiTokenMapper.ApiTokenDeleteMapper();

  public static getInstance(): ApiTokenDeleteUseCase {
    if (!ApiTokenDeleteUseCase.instance)
      ApiTokenDeleteUseCase.instance = new ApiTokenDeleteUseCase();
    return ApiTokenDeleteUseCase.instance;
  }

  public async execute(params: IApiTokenDeleteDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}