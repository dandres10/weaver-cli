import { Mapper } from "@bus/core/classes";
import { IMenuDeleteDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuDeleteEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";

export class MenuDeleteMapper extends Mapper<IMenuDeleteEntity, IMenuDeleteDTO> {

  private static instance: MenuDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): MenuDeleteMapper {
    if (!MenuDeleteMapper.instance)
      MenuDeleteMapper.instance = new MenuDeleteMapper();
    return MenuDeleteMapper.instance;
  }

  public mapFrom(param: IMenuDeleteEntity): IMenuDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IMenuDeleteEntity[]): IMenuDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuDeleteDTO): IMenuDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IMenuDeleteDTO[]): IMenuDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}