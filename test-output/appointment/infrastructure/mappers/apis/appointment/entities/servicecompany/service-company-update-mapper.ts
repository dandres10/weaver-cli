import { Mapper } from "@bus/core/classes";
import { IServiceCompanyUpdateDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanyUpdateEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export class ServiceCompanyUpdateMapper extends Mapper<IServiceCompanyUpdateEntity, IServiceCompanyUpdateDTO> {

  private static instance: ServiceCompanyUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): ServiceCompanyUpdateMapper {
    if (!ServiceCompanyUpdateMapper.instance)
      ServiceCompanyUpdateMapper.instance = new ServiceCompanyUpdateMapper();
    return ServiceCompanyUpdateMapper.instance;
  }

  public mapFrom(param: IServiceCompanyUpdateEntity): IServiceCompanyUpdateDTO {
    return {
      id: param.id,
      serviceId: param.service_id,
      companyId: param.company_id
    };
  }

  public mapFromList(params: IServiceCompanyUpdateEntity[]): IServiceCompanyUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IServiceCompanyUpdateDTO): IServiceCompanyUpdateEntity {
    return {
      id: param.id,
      service_id: param.serviceId,
      company_id: param.companyId
    };
  }

  public mapToList(params: IServiceCompanyUpdateDTO[]): IServiceCompanyUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}