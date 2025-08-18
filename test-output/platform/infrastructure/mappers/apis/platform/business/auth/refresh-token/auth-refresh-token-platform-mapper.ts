import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPlatformEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenPlatformMapper extends Mapper<IAuthRefreshTokenPlatformEntity, IAuthRefreshTokenPlatformDTO> {

    private static instance: AuthRefreshTokenPlatformMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformMapper {
        if (!AuthRefreshTokenPlatformMapper.instance)
            AuthRefreshTokenPlatformMapper.instance = new AuthRefreshTokenPlatformMapper();
        return AuthRefreshTokenPlatformMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformEntity): IAuthRefreshTokenPlatformDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformEntity[]): IAuthRefreshTokenPlatformDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformDTO): IAuthRefreshTokenPlatformEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformDTO[]): IAuthRefreshTokenPlatformEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformDTO) => {
            return this.mapTo(param);
        })
    }
}