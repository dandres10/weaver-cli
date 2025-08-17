import { Mapper } from "@bus/core/classes";
import { IPlatformDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";

export class PlatformEntityMapper extends Mapper<IPlatformEntity, IPlatformDTO> {
  private static instance: PlatformEntityMapper;
  public constructor() { super(); }

  public static getInstance(): PlatformEntityMapper {
    if (!PlatformEntityMapper.instance)
      PlatformEntityMapper.instance = new PlatformEntityMapper();
    return PlatformEntityMapper.instance;
  }

  public mapFrom(param: IPlatformEntity): IPlatformDTO {
    return {
      id: param.id,
      languageId: param.language_id,
      locationId: param.location_id,
      currencyId: param.currency_id,
      tokenExpirationMinutes: param.token_expiration_minutes,
      refreshTokenExpirationMinutes: param.refresh_token_expiration_minutes
    };
  }

  public mapFromList(params: IPlatformEntity[]): IPlatformDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IPlatformDTO): IPlatformEntity {
    return {
      id: param.id,
      language_id: param.languageId,
      location_id: param.locationId,
      currency_id: param.currencyId,
      token_expiration_minutes: param.tokenExpirationMinutes,
      refresh_token_expiration_minutes: param.refreshTokenExpirationMinutes
    };
  }

  public mapToList(params: IPlatformDTO[]): IPlatformEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}