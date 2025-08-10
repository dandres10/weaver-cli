import { Mapper } from "@bus/core/classes";
import { IUserReadDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserReadEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";

export class UserReadMapper extends Mapper<IUserReadEntity, IUserReadDTO> {

  private static instance: UserReadMapper;
  public constructor() { super(); }

  public static getInstance(): UserReadMapper {
    if (!UserReadMapper.instance)
      UserReadMapper.instance = new UserReadMapper();
    return UserReadMapper.instance;
  }

  public mapFrom(param: IUserReadEntity): IUserReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IUserReadEntity[]): IUserReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IUserReadDTO): IUserReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IUserReadDTO[]): IUserReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}