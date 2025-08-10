import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyDTO, ICompanyUpdateDTO } from "@platform/domain/models/apis/platform/entities/company";
import { InjectionPlatformEntitiesCompanyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CompanyUpdateUseCase implements UseCase<ICompanyUpdateDTO, ICompanyDTO | null> {
  private static instance: CompanyUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.CompanyRepository();
  private mapper = InjectionPlatformEntitiesCompanyMapper.CompanyUpdateMapper();

  public static getInstance(): CompanyUpdateUseCase {
    if (!CompanyUpdateUseCase.instance)
      CompanyUpdateUseCase.instance = new CompanyUpdateUseCase();
    return CompanyUpdateUseCase.instance;
  }

  public async execute(params: ICompanyUpdateDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}