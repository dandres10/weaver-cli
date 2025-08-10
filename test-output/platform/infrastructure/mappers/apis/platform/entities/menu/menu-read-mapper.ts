import { Mapper } from "@bus/core/classes";
import { IMenuReadDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuReadEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";

export class MenuReadMapper extends Mapper<IMenuReadEntity, IMenuReadDTO> {

  private static instance: MenuReadMapper;
  public constructor() { super(); }

  public static getInstance(): MenuReadMapper {
    if (!MenuReadMapper.instance)
      MenuReadMapper.instance = new MenuReadMapper();
    return MenuReadMapper.instance;
  }

  public mapFrom(param: IMenuReadEntity): IMenuReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IMenuReadEntity[]): IMenuReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuReadDTO): IMenuReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IMenuReadDTO[]): IMenuReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}