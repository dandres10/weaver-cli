import { Mapper } from "@bus/core/classes";
import { IMenuDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";

export class MenuEntityMapper extends Mapper<IMenuEntity, IMenuDTO> {
  private static instance: MenuEntityMapper;
  public constructor() { super(); }

  public static getInstance(): MenuEntityMapper {
    if (!MenuEntityMapper.instance)
      MenuEntityMapper.instance = new MenuEntityMapper();
    return MenuEntityMapper.instance;
  }

  public mapFrom(param: IMenuEntity): IMenuDTO {
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

  public mapFromList(params: IMenuEntity[]): IMenuDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuDTO): IMenuEntity {
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

  public mapToList(params: IMenuDTO[]): IMenuEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}