import { MenuRepository } from "../../entities/menu";
import { UserRepository } from "../../entities/user";

export class InjectionPlatformEntitiesRepository {
  public static MenuRepository() { return MenuRepository.getInstance(); }
  public static UserRepository() { return UserRepository.getInstance(); }
}


