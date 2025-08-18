import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPlatformResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthRefreshTokenPlatformResponseMapper extends Mapper<IAuthRefreshTokenPlatformResponseEntity, IAuthRefreshTokenPlatformResponseDTO> {

    private static instance: AuthRefreshTokenPlatformResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformResponseMapper {
        if (!AuthRefreshTokenPlatformResponseMapper.instance)
            AuthRefreshTokenPlatformResponseMapper.instance = new AuthRefreshTokenPlatformResponseMapper();
        return AuthRefreshTokenPlatformResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformResponseEntity): IAuthRefreshTokenPlatformResponseDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformResponseEntity[]): IAuthRefreshTokenPlatformResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformResponseDTO): IAuthRefreshTokenPlatformResponseEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformResponseDTO[]): IAuthRefreshTokenPlatformResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformResponseDTO) => {
            return this.mapTo(param);
        })
    }
}