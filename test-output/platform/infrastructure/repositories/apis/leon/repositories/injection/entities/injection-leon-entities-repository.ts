import { ApiTokenRepository } from "../../entities/apitoken/api-token-repository";

export class InjectionLeonEntitiesRepository {
  public static ApiTokenRepository() { return ApiTokenRepository.getInstance(); }
}


