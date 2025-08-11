import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenDeleteDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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