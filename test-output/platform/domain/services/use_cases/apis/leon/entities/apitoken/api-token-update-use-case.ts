import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO, IApiTokenUpdateDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@leon/infrastructure/mappers/apis/leon/injection/entities/injection-leon-entities-api-token-mapper";
import { InjectionPlatformEntitiesRepository } from "@leon/infrastructure/repositories/apis/leon/repositories/injection/entities/injection-leon-entities-repository";

export class ApiTokenUpdateUseCase implements UseCase<IApiTokenUpdateDTO, IApiTokenDTO | null> {
  private static instance: ApiTokenUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.ApiTokenRepository();
  private mapper = InjectionPlatformEntitiesApiTokenMapper.ApiTokenUpdateMapper();

  public static getInstance(): ApiTokenUpdateUseCase {
    if (!ApiTokenUpdateUseCase.instance)
      ApiTokenUpdateUseCase.instance = new ApiTokenUpdateUseCase();
    return ApiTokenUpdateUseCase.instance;
  }

  public async execute(params: IApiTokenUpdateDTO, config?: IConfigDTO): Promise<IApiTokenDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}