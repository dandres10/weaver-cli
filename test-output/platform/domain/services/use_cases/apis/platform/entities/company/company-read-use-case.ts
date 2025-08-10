import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyDTO, ICompanyReadDTO } from "@platform/domain/models/apis/platform/entities/company";
import { InjectionPlatformEntitiesCompanyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-company-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CompanyReadUseCase implements UseCase<ICompanyReadDTO, ICompanyDTO | null> {
  private static instance: CompanyReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.CompanyRepository();
  private mapper = InjectionPlatformEntitiesCompanyMapper.CompanyReadMapper();

  public static getInstance(): CompanyReadUseCase {
    if (!CompanyReadUseCase.instance)
      CompanyReadUseCase.instance = new CompanyReadUseCase();
    return CompanyReadUseCase.instance;
  }

  public async execute(params: ICompanyReadDTO, config?: IConfigDTO): Promise<ICompanyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}