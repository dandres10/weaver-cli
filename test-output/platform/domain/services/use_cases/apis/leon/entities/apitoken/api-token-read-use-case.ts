import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenReadDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@leon/infrastructure/mappers/apis/leon/injection/entities/injection-leon-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@leon/infrastructure/repositories/apis/leon/repositories/injection/entities/injection-leon-entities-repository";

export class ApiTokenReadUseCase implements UseCase<IApiTokenReadDTO, IApiTokenDTO | null> {
  private static instance: ApiTokenReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.ApiTokenRepository();
  private mapper = InjectionPlatformEntitiesApiTokenMapper.ApiTokenReadMapper();

  public static getInstance(): ApiTokenReadUseCase {
    if (!ApiTokenReadUseCase.instance)
      ApiTokenReadUseCase.instance = new ApiTokenReadUseCase();
    return ApiTokenReadUseCase.instance;
  }

  public async execute(params: IApiTokenReadDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}