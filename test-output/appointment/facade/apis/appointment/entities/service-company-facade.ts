import { IConfigDTO } from "@bus/core/interfaces";
import {
  IServiceCompanyDTO,
  IServiceCompanyDeleteDTO,
  IServiceCompanyReadDTO,
  IServiceCompanySaveDTO,
  IServiceCompanyUpdateDTO,
} from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesServiceCompanyUseCase } from "@appointment/domain/services/use_cases/apis/appointment/injection/entities/injection-appointment-entities-service-company-use-case";

export class ServiceCompanyFacade {
  private static instance: ServiceCompanyFacade;

  private readonly readUseCase = InjectionPlatformEntitiesServiceCompanyUseCase.ServiceCompanyReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesServiceCompanyUseCase.ServiceCompanySaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesServiceCompanyUseCase.ServiceCompanyUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesServiceCompanyUseCase.ServiceCompanyDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesServiceCompanyUseCase.ServiceCompanyListUseCase();

  public static getInstance(): ServiceCompanyFacade {
    if (!ServiceCompanyFacade.instance)
      ServiceCompanyFacade.instance = new ServiceCompanyFacade();
    return ServiceCompanyFacade.instance;
  }

  public async read(params: IServiceCompanyReadDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IServiceCompanySaveDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IServiceCompanyUpdateDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IServiceCompanyDeleteDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IServiceCompanyDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}