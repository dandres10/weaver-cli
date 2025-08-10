import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenReadDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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