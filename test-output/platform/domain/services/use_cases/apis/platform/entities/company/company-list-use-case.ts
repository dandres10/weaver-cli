import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyDTO } from "@platform/domain/models/apis/platform/entities/company";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class CompanyListUseCase implements UseCase<IPaginationBackendDTO, ICompanyDTO[] | null> {
  private static instance: CompanyListUseCase;
  private repository = InjectionPlatformEntitiesRepository.CompanyRepository();

  public static getInstance(): CompanyListUseCase {
    if (!CompanyListUseCase.instance)
      CompanyListUseCase.instance = new CompanyListUseCase();
    return CompanyListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICompanyDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}