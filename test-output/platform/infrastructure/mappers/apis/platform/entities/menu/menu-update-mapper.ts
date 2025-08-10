import { Mapper } from "@bus/core/classes";
import { IMenuUpdateDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";

export class MenuUpdateMapper extends Mapper<IMenuUpdateEntity, IMenuUpdateDTO> {

  private static instance: MenuUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): MenuUpdateMapper {
    if (!MenuUpdateMapper.instance)
      MenuUpdateMapper.instance = new MenuUpdateMapper();
    return MenuUpdateMapper.instance;
  }

  public mapFrom(param: IMenuUpdateEntity): IMenuUpdateDTO {
    return {
      companyId: param.company_id,
      name: param.name,
      label: param.label,
      description: param.description,
      topId: param.top_id,
      route: param.route,
      state: param.state,
      icon: param.icon
    };
  }

  public mapFromList(params: IMenuUpdateEntity[]): IMenuUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuUpdateDTO): IMenuUpdateEntity {
    return {
      company_id: param.companyId,
      name: param.name,
      label: param.label,
      description: param.description,
      top_id: param.topId,
      route: param.route,
      state: param.state,
      icon: param.icon
    };
  }

  public mapToList(params: IMenuUpdateDTO[]): IMenuUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}