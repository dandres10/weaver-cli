import { Mapper } from "@bus/core/classes";
import { ICompanyDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanyEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";

export class CompanyEntityMapper extends Mapper<ICompanyEntity, ICompanyDTO> {
  private static instance: CompanyEntityMapper;
  public constructor() { super(); }

  public static getInstance(): CompanyEntityMapper {
    if (!CompanyEntityMapper.instance)
      CompanyEntityMapper.instance = new CompanyEntityMapper();
    return CompanyEntityMapper.instance;
  }

  public mapFrom(param: ICompanyEntity): ICompanyDTO {
    return {
      id: param.id,
      name: param.name,
      inactivityTime: param.inactivity_time,
      nit: param.nit,
      state: param.state
    };
  }

  public mapFromList(params: ICompanyEntity[]): ICompanyDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICompanyDTO): ICompanyEntity {
    return {
      id: param.id,
      name: param.name,
      inactivity_time: param.inactivityTime,
      nit: param.nit,
      state: param.state
    };
  }

  public mapToList(params: ICompanyDTO[]): ICompanyEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}