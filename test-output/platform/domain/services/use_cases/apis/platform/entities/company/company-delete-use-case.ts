import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyDTO, ICompanyDeleteDTO } from "@platform/domain/models/apis/platform/entities/company";
import { InjectionPlatformEntitiesCompanyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CompanyDeleteUseCase implements UseCase<ICompanyDeleteDTO, ICompanyDTO | null> {
  private static instance: CompanyDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.CompanyRepository();
  private mapper = InjectionPlatformEntitiesCompanyMapper.CompanyDeleteMapper();

  public static getInstance(): CompanyDeleteUseCase {
    if (!CompanyDeleteUseCase.instance)
      CompanyDeleteUseCase.instance = new CompanyDeleteUseCase();
    return CompanyDeleteUseCase.instance;
  }

  public async execute(params: ICompanyDeleteDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}