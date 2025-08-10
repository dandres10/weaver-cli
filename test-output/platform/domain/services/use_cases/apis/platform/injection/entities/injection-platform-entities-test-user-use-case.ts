import { TestUserDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/testuser/test-user-delete-use-case";
import { TestUserListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/testuser/test-user-list-use-case";
import { TestUserReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/testuser/test-user-read-use-case";
import { TestUserSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/testuser/test-user-save-use-case";
import { TestUserUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/testuser/test-user-update-use-case";

export class InjectionPlatformEntitiesTestUserUseCase {
  public static TestUserReadUseCase(): TestUserReadUseCase {
    return TestUserReadUseCase.getInstance();
  }

  public static TestUserSaveUseCase(): TestUserSaveUseCase {
    return TestUserSaveUseCase.getInstance();
  }

  public static TestUserUpdateUseCase(): TestUserUpdateUseCase {
    return TestUserUpdateUseCase.getInstance();
  }

  public static TestUserDeleteUseCase(): TestUserDeleteUseCase {
    return TestUserDeleteUseCase.getInstance();
  }

  public static TestUserListUseCase(): TestUserListUseCase {
    return TestUserListUseCase.getInstance();
  }
}