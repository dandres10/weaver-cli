import { Mapper } from "@bus/core/classes";
import { ICompanyDeleteDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanyDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";

export class CompanyDeleteMapper extends Mapper<ICompanyDeleteEntity, ICompanyDeleteDTO> {

  private static instance: CompanyDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): CompanyDeleteMapper {
    if (!CompanyDeleteMapper.instance)
      CompanyDeleteMapper.instance = new CompanyDeleteMapper();
    return CompanyDeleteMapper.instance;
  }

  public mapFrom(param: ICompanyDeleteEntity): ICompanyDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICompanyDeleteEntity[]): ICompanyDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICompanyDeleteDTO): ICompanyDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICompanyDeleteDTO[]): ICompanyDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}