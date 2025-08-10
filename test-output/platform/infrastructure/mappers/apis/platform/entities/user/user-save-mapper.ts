import { Mapper } from "@bus/core/classes";
import { IUserSaveDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserSaveEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";

export class UserSaveMapper extends Mapper<IUserSaveEntity, IUserSaveDTO> {

  private static instance: UserSaveMapper;
  public constructor() { super(); }

  public static getInstance(): UserSaveMapper {
    if (!UserSaveMapper.instance)
      UserSaveMapper.instance = new UserSaveMapper();
    return UserSaveMapper.instance;
  }

  public mapFrom(param: IUserSaveEntity): IUserSaveDTO {
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

  public mapFromList(params: IUserSaveEntity[]): IUserSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IUserSaveDTO): IUserSaveEntity {
    return {
      platform_id: param.platformId,
      password: param.password,
      email: param.email,
      identification: param.identification,
      first_name: param.firstName,
      last_name: param.lastName,
      phone: param.phone,
      refresh_token: param.refreshToken,
      state: param.state ?? true
    };
  }

  public mapToList(params: IUserSaveDTO[]): IUserSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}