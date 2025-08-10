import { TestUserDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/testuser/test-user-delete-mapper";
import { TestUserEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/testuser/test-user-entity-mapper";
import { TestUserReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/testuser/test-user-read-mapper";
import { TestUserSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/testuser/test-user-save-mapper";
import { TestUserUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/testuser/test-user-update-mapper";

export class InjectionPlatformEntitiesTestUserMapper {
  public static TestUserEntityMapper(): TestUserEntityMapper {
    return TestUserEntityMapper.getInstance();
  }

  public static TestUserSaveMapper(): TestUserSaveMapper {
    return TestUserSaveMapper.getInstance();
  }

  public static TestUserReadMapper(): TestUserReadMapper {
    return TestUserReadMapper.getInstance();
  }

  public static TestUserUpdateMapper(): TestUserUpdateMapper {
    return TestUserUpdateMapper.getInstance();
  }

  public static TestUserDeleteMapper(): TestUserDeleteMapper {
    return TestUserDeleteMapper.getInstance();
  }
}