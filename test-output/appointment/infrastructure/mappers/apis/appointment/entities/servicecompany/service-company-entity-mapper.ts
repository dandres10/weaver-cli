import { Mapper } from "@bus/core/classes";
import { IServiceCompanyDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanyEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export class ServiceCompanyEntityMapper extends Mapper<IServiceCompanyEntity, IServiceCompanyDTO> {
  private static instance: ServiceCompanyEntityMapper;
  public constructor() { super(); }

  public static getInstance(): ServiceCompanyEntityMapper {
    if (!ServiceCompanyEntityMapper.instance)
      ServiceCompanyEntityMapper.instance = new ServiceCompanyEntityMapper();
    return ServiceCompanyEntityMapper.instance;
  }

  public mapFrom(param: IServiceCompanyEntity): IServiceCompanyDTO {
    return {
      id: param.id,
      id: param.id,
      serviceId: param.service_id,
      companyId: param.company_id
    };
  }

  public mapFromList(params: IServiceCompanyEntity[]): IServiceCompanyDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IServiceCompanyDTO): IServiceCompanyEntity {
    return {
      id: param.id,
      id: param.id,
      service_id: param.serviceId,
      company_id: param.companyId
    };
  }

  public mapToList(params: IServiceCompanyDTO[]): IServiceCompanyEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}