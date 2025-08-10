import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyDTO, ICompanySaveDTO } from "@platform/domain/models/apis/platform/entities/company";
import { InjectionPlatformEntitiesCompanyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CompanySaveUseCase implements UseCase<ICompanySaveDTO, ICompanyDTO | null> {
  private static instance: CompanySaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.CompanyRepository();
  private mapper = InjectionPlatformEntitiesCompanyMapper.CompanySaveMapper();

  public static getInstance(): CompanySaveUseCase {
    if (!CompanySaveUseCase.instance)
      CompanySaveUseCase.instance = new CompanySaveUseCase();
    return CompanySaveUseCase.instance;
  }

  public async execute(params: ICompanySaveDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}