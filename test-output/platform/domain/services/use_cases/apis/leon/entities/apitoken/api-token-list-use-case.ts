import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IApiTokenDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { InjectionPlatformEntitiesRepository } from "@leon/infrastructure/repositories/apis/leon/repositories/injection/entities/injection-leon-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class ApiTokenListUseCase implements UseCase<IPaginationBackendDTO, IApiTokenDTO[] | null> {
  private static instance: ApiTokenListUseCase;
  private repository = InjectionPlatformEntitiesRepository.ApiTokenRepository();

  public static getInstance(): ApiTokenListUseCase {
    if (!ApiTokenListUseCase.instance)
      ApiTokenListUseCase.instance = new ApiTokenListUseCase();
    return ApiTokenListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IApiTokenDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}