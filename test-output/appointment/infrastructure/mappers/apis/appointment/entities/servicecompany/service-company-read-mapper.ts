import { Mapper } from "@bus/core/classes";
import { IServiceCompanyReadDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanyReadEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export class ServiceCompanyReadMapper extends Mapper<IServiceCompanyReadEntity, IServiceCompanyReadDTO> {

  private static instance: ServiceCompanyReadMapper;
  public constructor() { super(); }

  public static getInstance(): ServiceCompanyReadMapper {
    if (!ServiceCompanyReadMapper.instance)
      ServiceCompanyReadMapper.instance = new ServiceCompanyReadMapper();
    return ServiceCompanyReadMapper.instance;
  }

  public mapFrom(param: IServiceCompanyReadEntity): IServiceCompanyReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IServiceCompanyReadEntity[]): IServiceCompanyReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IServiceCompanyReadDTO): IServiceCompanyReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IServiceCompanyReadDTO[]): IServiceCompanyReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}