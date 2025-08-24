import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IServiceCompanyDTO, IServiceCompanyReadDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesServiceCompanyMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-service-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class ServiceCompanyReadUseCase implements UseCase<IServiceCompanyReadDTO, IServiceCompanyDTO | null> {
  private static instance: ServiceCompanyReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.ServiceCompanyRepository();
  private mapper = InjectionPlatformEntitiesServiceCompanyMapper.ServiceCompanyReadMapper();

  public static getInstance(): ServiceCompanyReadUseCase {
    if (!ServiceCompanyReadUseCase.instance)
      ServiceCompanyReadUseCase.instance = new ServiceCompanyReadUseCase();
    return ServiceCompanyReadUseCase.instance;
  }

  public async execute(params: IServiceCompanyReadDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}