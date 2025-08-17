import { Mapper } from "@bus/core/classes";
import { IPlatformUpdateDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";

export class PlatformUpdateMapper extends Mapper<IPlatformUpdateEntity, IPlatformUpdateDTO> {

  private static instance: PlatformUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): PlatformUpdateMapper {
    if (!PlatformUpdateMapper.instance)
      PlatformUpdateMapper.instance = new PlatformUpdateMapper();
    return PlatformUpdateMapper.instance;
  }

  public mapFrom(param: IPlatformUpdateEntity): IPlatformUpdateDTO {
    return {
      languageId: param.language_id,
      locationId: param.location_id,
      currencyId: param.currency_id,
      tokenExpirationMinutes: param.token_expiration_minutes,
      refreshTokenExpirationMinutes: param.refresh_token_expiration_minutes
    };
  }

  public mapFromList(params: IPlatformUpdateEntity[]): IPlatformUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IPlatformUpdateDTO): IPlatformUpdateEntity {
    return {
      language_id: param.languageId,
      location_id: param.locationId,
      currency_id: param.currencyId,
      token_expiration_minutes: param.tokenExpirationMinutes,
      refresh_token_expiration_minutes: param.refreshTokenExpirationMinutes
    };
  }

  public mapToList(params: IPlatformUpdateDTO[]): IPlatformUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}