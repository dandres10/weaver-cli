import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IServiceCompanyDTO, IServiceCompanyUpdateDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesServiceCompanyMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-service-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class ServiceCompanyUpdateUseCase implements UseCase<IServiceCompanyUpdateDTO, IServiceCompanyDTO | null> {
  private static instance: ServiceCompanyUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.ServiceCompanyRepository();
  private mapper = InjectionPlatformEntitiesServiceCompanyMapper.ServiceCompanyUpdateMapper();

  public static getInstance(): ServiceCompanyUpdateUseCase {
    if (!ServiceCompanyUpdateUseCase.instance)
      ServiceCompanyUpdateUseCase.instance = new ServiceCompanyUpdateUseCase();
    return ServiceCompanyUpdateUseCase.instance;
  }

  public async execute(params: IServiceCompanyUpdateDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}