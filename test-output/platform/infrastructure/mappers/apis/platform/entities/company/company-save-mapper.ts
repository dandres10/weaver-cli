import { Mapper } from "@bus/core/classes";
import { ICompanySaveDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanySaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";

export class CompanySaveMapper extends Mapper<ICompanySaveEntity, ICompanySaveDTO> {

  private static instance: CompanySaveMapper;
  public constructor() { super(); }

  public static getInstance(): CompanySaveMapper {
    if (!CompanySaveMapper.instance)
      CompanySaveMapper.instance = new CompanySaveMapper();
    return CompanySaveMapper.instance;
  }

  public mapFrom(param: ICompanySaveEntity): ICompanySaveDTO {
    return {
      name: param.name,
      inactivityTime: param.inactivity_time,
      nit: param.nit,
      state: param.state
    };
  }

  public mapFromList(params: ICompanySaveEntity[]): ICompanySaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICompanySaveDTO): ICompanySaveEntity {
    return {
      name: param.name,
      inactivity_time: param.inactivityTime,
      nit: param.nit,
      state: param.state ?? true
    };
  }

  public mapToList(params: ICompanySaveDTO[]): ICompanySaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}