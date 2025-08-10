import { UserDeleteMapper } from "@bus/infrastructure/mappers/apis/platform/entities/user/user-delete-mapper";
import { UserEntityMapper } from "@bus/infrastructure/mappers/apis/platform/entities/user/user-entity-mapper";
import { UserReadMapper } from "@bus/infrastructure/mappers/apis/platform/entities/user/user-read-mapper";
import { UserSaveMapper } from "@bus/infrastructure/mappers/apis/platform/entities/user/user-save-mapper";
import { UserUpdateMapper } from "@bus/infrastructure/mappers/apis/platform/entities/user/user-update-mapper";

export class InjectionPlatformEntitiesUserMapper {
  public static UserEntityMapper(): UserEntityMapper {
    return UserEntityMapper.getInstance();
  }

  public static UserSaveMapper(): UserSaveMapper {
    return UserSaveMapper.getInstance();
  }

  public static UserReadMapper(): UserReadMapper {
    return UserReadMapper.getInstance();
  }

  public static UserUpdateMapper(): UserUpdateMapper {
    return UserUpdateMapper.getInstance();
  }

  public static UserDeleteMapper(): UserDeleteMapper {
    return UserDeleteMapper.getInstance();
  }
}