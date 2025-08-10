import { UserDeleteUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/user/user-delete-use-case";
import { UserListUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/user/user-list-use-case";
import { UserReadUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/user/user-read-use-case";
import { UserSaveUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/user/user-save-use-case";
import { UserUpdateUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/user/user-update-use-case";

export class InjectionPlatformEntitiesUserUseCase {
  public static UserReadUseCase(): UserReadUseCase {
    return UserReadUseCase.getInstance();
  }

  public static UserSaveUseCase(): UserSaveUseCase {
    return UserSaveUseCase.getInstance();
  }

  public static UserUpdateUseCase(): UserUpdateUseCase {
    return UserUpdateUseCase.getInstance();
  }

  public static UserDeleteUseCase(): UserDeleteUseCase {
    return UserDeleteUseCase.getInstance();
  }

  public static UserListUseCase(): UserListUseCase {
    return UserListUseCase.getInstance();
  }
}