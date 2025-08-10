import { Mapper } from "@bus/core/classes";
import { IUserUpdateDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";

export class UserUpdateMapper extends Mapper<IUserUpdateEntity, IUserUpdateDTO> {

  private static instance: UserUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): UserUpdateMapper {
    if (!UserUpdateMapper.instance)
      UserUpdateMapper.instance = new UserUpdateMapper();
    return UserUpdateMapper.instance;
  }

  public mapFrom(param: IUserUpdateEntity): IUserUpdateDTO {
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

  public mapFromList(params: IUserUpdateEntity[]): IUserUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IUserUpdateDTO): IUserUpdateEntity {
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

  public mapToList(params: IUserUpdateDTO[]): IUserUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}