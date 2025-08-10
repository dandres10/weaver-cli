import { Mapper } from "@bus/core/classes";
import { ICompanyUpdateDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanyUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";

export class CompanyUpdateMapper extends Mapper<ICompanyUpdateEntity, ICompanyUpdateDTO> {

  private static instance: CompanyUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): CompanyUpdateMapper {
    if (!CompanyUpdateMapper.instance)
      CompanyUpdateMapper.instance = new CompanyUpdateMapper();
    return CompanyUpdateMapper.instance;
  }

  public mapFrom(param: ICompanyUpdateEntity): ICompanyUpdateDTO {
    return {
      name: param.name,
      inactivityTime: param.inactivity_time,
      nit: param.nit,
      state: param.state
    };
  }

  public mapFromList(params: ICompanyUpdateEntity[]): ICompanyUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICompanyUpdateDTO): ICompanyUpdateEntity {
    return {
      name: param.name,
      inactivity_time: param.inactivityTime,
      nit: param.nit,
      state: param.state
    };
  }

  public mapToList(params: ICompanyUpdateDTO[]): ICompanyUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}