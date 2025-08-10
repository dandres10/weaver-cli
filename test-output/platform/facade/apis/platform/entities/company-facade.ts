import { IConfigDTO } from "@bus/core/interfaces";
import {
  ICompanyDTO,
  ICompanyDeleteDTO,
  ICompanyReadDTO,
  ICompanySaveDTO,
  ICompanyUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/company";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesCompanyUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-company-use-case";

export class CompanyFacade {
  private static instance: CompanyFacade;

  private readonly readUseCase = InjectionPlatformEntitiesCompanyUseCase.CompanyReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesCompanyUseCase.CompanySaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesCompanyUseCase.CompanyUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesCompanyUseCase.CompanyDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesCompanyUseCase.CompanyListUseCase();

  public static getInstance(): CompanyFacade {
    if (!CompanyFacade.instance)
      CompanyFacade.instance = new CompanyFacade();
    return CompanyFacade.instance;
  }

  public async read(params: ICompanyReadDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ICompanySaveDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ICompanyUpdateDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ICompanyDeleteDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICompanyDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}