import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IServiceCompanyDTO, IServiceCompanyDeleteDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesServiceCompanyMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-service-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class ServiceCompanyDeleteUseCase implements UseCase<IServiceCompanyDeleteDTO, IServiceCompanyDTO | null> {
  private static instance: ServiceCompanyDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.ServiceCompanyRepository();
  private mapper = InjectionPlatformEntitiesServiceCompanyMapper.ServiceCompanyDeleteMapper();

  public static getInstance(): ServiceCompanyDeleteUseCase {
    if (!ServiceCompanyDeleteUseCase.instance)
      ServiceCompanyDeleteUseCase.instance = new ServiceCompanyDeleteUseCase();
    return ServiceCompanyDeleteUseCase.instance;
  }

  public async execute(params: IServiceCompanyDeleteDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}