import { Mapper } from "@bus/core/classes";
import { IMenuSaveDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuSaveEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";

export class MenuSaveMapper extends Mapper<IMenuSaveEntity, IMenuSaveDTO> {

  private static instance: MenuSaveMapper;
  public constructor() { super(); }

  public static getInstance(): MenuSaveMapper {
    if (!MenuSaveMapper.instance)
      MenuSaveMapper.instance = new MenuSaveMapper();
    return MenuSaveMapper.instance;
  }

  public mapFrom(param: IMenuSaveEntity): IMenuSaveDTO {
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

  public mapFromList(params: IMenuSaveEntity[]): IMenuSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuSaveDTO): IMenuSaveEntity {
    return {
      company_id: param.companyId,
      name: param.name,
      label: param.label,
      description: param.description,
      top_id: param.topId,
      route: param.route,
      state: param.state ?? true,
      icon: param.icon
    };
  }

  public mapToList(params: IMenuSaveDTO[]): IMenuSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}