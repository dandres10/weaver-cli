import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IServiceCompanyDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class ServiceCompanyListUseCase implements UseCase<IPaginationBackendDTO, IServiceCompanyDTO[] | null> {
  private static instance: ServiceCompanyListUseCase;
  private repository = InjectionPlatformEntitiesRepository.ServiceCompanyRepository();

  public static getInstance(): ServiceCompanyListUseCase {
    if (!ServiceCompanyListUseCase.instance)
      ServiceCompanyListUseCase.instance = new ServiceCompanyListUseCase();
    return ServiceCompanyListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}