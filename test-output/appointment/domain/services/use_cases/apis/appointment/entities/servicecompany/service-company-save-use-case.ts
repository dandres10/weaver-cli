import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IServiceCompanyDTO, IServiceCompanySaveDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesServiceCompanyMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-service-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class ServiceCompanySaveUseCase implements UseCase<IServiceCompanySaveDTO, IServiceCompanyDTO | null> {
  private static instance: ServiceCompanySaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.ServiceCompanyRepository();
  private mapper = InjectionPlatformEntitiesServiceCompanyMapper.ServiceCompanySaveMapper();

  public static getInstance(): ServiceCompanySaveUseCase {
    if (!ServiceCompanySaveUseCase.instance)
      ServiceCompanySaveUseCase.instance = new ServiceCompanySaveUseCase();
    return ServiceCompanySaveUseCase.instance;
  }

  public async execute(params: IServiceCompanySaveDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}