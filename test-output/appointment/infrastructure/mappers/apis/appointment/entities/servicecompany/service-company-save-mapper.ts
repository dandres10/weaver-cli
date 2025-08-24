import { Mapper } from "@bus/core/classes";
import { IServiceCompanySaveDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanySaveEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export class ServiceCompanySaveMapper extends Mapper<IServiceCompanySaveEntity, IServiceCompanySaveDTO> {

  private static instance: ServiceCompanySaveMapper;
  public constructor() { super(); }

  public static getInstance(): ServiceCompanySaveMapper {
    if (!ServiceCompanySaveMapper.instance)
      ServiceCompanySaveMapper.instance = new ServiceCompanySaveMapper();
    return ServiceCompanySaveMapper.instance;
  }

  public mapFrom(param: IServiceCompanySaveEntity): IServiceCompanySaveDTO {
    return {
      serviceId: param.service_id,
      companyId: param.company_id
    };
  }

  public mapFromList(params: IServiceCompanySaveEntity[]): IServiceCompanySaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IServiceCompanySaveDTO): IServiceCompanySaveEntity {
    return {
      service_id: param.serviceId,
      company_id: param.companyId
    };
  }

  public mapToList(params: IServiceCompanySaveDTO[]): IServiceCompanySaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}