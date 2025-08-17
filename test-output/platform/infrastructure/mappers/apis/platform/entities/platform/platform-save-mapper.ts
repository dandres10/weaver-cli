import { Mapper } from "@bus/core/classes";
import { IPlatformSaveDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";

export class PlatformSaveMapper extends Mapper<IPlatformSaveEntity, IPlatformSaveDTO> {

  private static instance: PlatformSaveMapper;
  public constructor() { super(); }

  public static getInstance(): PlatformSaveMapper {
    if (!PlatformSaveMapper.instance)
      PlatformSaveMapper.instance = new PlatformSaveMapper();
    return PlatformSaveMapper.instance;
  }

  public mapFrom(param: IPlatformSaveEntity): IPlatformSaveDTO {
    return {
      languageId: param.language_id,
      locationId: param.location_id,
      currencyId: param.currency_id,
      tokenExpirationMinutes: param.token_expiration_minutes,
      refreshTokenExpirationMinutes: param.refresh_token_expiration_minutes
    };
  }

  public mapFromList(params: IPlatformSaveEntity[]): IPlatformSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IPlatformSaveDTO): IPlatformSaveEntity {
    return {
      language_id: param.languageId,
      location_id: param.locationId,
      currency_id: param.currencyId,
      token_expiration_minutes: param.tokenExpirationMinutes,
      refresh_token_expiration_minutes: param.refreshTokenExpirationMinutes
    };
  }

  public mapToList(params: IPlatformSaveDTO[]): IPlatformSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}