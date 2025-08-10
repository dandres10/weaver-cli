import { Mapper } from "@bus/core/classes";
import { IUserDeleteDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserDeleteEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";

export class UserDeleteMapper extends Mapper<IUserDeleteEntity, IUserDeleteDTO> {

  private static instance: UserDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): UserDeleteMapper {
    if (!UserDeleteMapper.instance)
      UserDeleteMapper.instance = new UserDeleteMapper();
    return UserDeleteMapper.instance;
  }

  public mapFrom(param: IUserDeleteEntity): IUserDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IUserDeleteEntity[]): IUserDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IUserDeleteDTO): IUserDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IUserDeleteDTO[]): IUserDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}