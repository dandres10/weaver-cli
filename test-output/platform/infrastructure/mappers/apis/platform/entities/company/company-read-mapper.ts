import { Mapper } from "@bus/core/classes";
import { ICompanyReadDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanyReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";

export class CompanyReadMapper extends Mapper<ICompanyReadEntity, ICompanyReadDTO> {

  private static instance: CompanyReadMapper;
  public constructor() { super(); }

  public static getInstance(): CompanyReadMapper {
    if (!CompanyReadMapper.instance)
      CompanyReadMapper.instance = new CompanyReadMapper();
    return CompanyReadMapper.instance;
  }

  public mapFrom(param: ICompanyReadEntity): ICompanyReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICompanyReadEntity[]): ICompanyReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICompanyReadDTO): ICompanyReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICompanyReadDTO[]): ICompanyReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}