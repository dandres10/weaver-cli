import { Mapper } from "@bus/core/classes";
import { IServiceCompanyDeleteDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanyDeleteEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export class ServiceCompanyDeleteMapper extends Mapper<IServiceCompanyDeleteEntity, IServiceCompanyDeleteDTO> {

  private static instance: ServiceCompanyDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): ServiceCompanyDeleteMapper {
    if (!ServiceCompanyDeleteMapper.instance)
      ServiceCompanyDeleteMapper.instance = new ServiceCompanyDeleteMapper();
    return ServiceCompanyDeleteMapper.instance;
  }

  public mapFrom(param: IServiceCompanyDeleteEntity): IServiceCompanyDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IServiceCompanyDeleteEntity[]): IServiceCompanyDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IServiceCompanyDeleteDTO): IServiceCompanyDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IServiceCompanyDeleteDTO[]): IServiceCompanyDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}