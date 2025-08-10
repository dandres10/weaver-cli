import { Mapper } from "@bus/core/classes";
import { IUserDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";

export class UserEntityMapper extends Mapper<IUserEntity, IUserDTO> {
  private static instance: UserEntityMapper;
  public constructor() { super(); }

  public static getInstance(): UserEntityMapper {
    if (!UserEntityMapper.instance)
      UserEntityMapper.instance = new UserEntityMapper();
    return UserEntityMapper.instance;
  }

  public mapFrom(param: IUserEntity): IUserDTO {
    return {
      platformId: param.platform_id,
      password: param.password,
      email: param.email,
      identification: param.identification,
      firstName: param.first_name,
      lastName: param.last_name,
      phone: param.phone,
      refreshToken: param.refresh_token,
      state: param.state
    };
  }

  public mapFromList(params: IUserEntity[]): IUserDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IUserDTO): IUserEntity {
    return {
      platform_id: param.platformId,
      password: param.password,
      email: param.email,
      identification: param.identification,
      first_name: param.firstName,
      last_name: param.lastName,
      phone: param.phone,
      refresh_token: param.refreshToken,
      state: param.state
    };
  }

  public mapToList(params: IUserDTO[]): IUserEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}