import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPlatformLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenPlatformLoginResponseMapper extends Mapper<IAuthRefreshTokenPlatformLoginResponseEntity, IAuthRefreshTokenPlatformLoginResponseDTO> {

    private static instance: AuthRefreshTokenPlatformLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformLoginResponseMapper {
        if (!AuthRefreshTokenPlatformLoginResponseMapper.instance)
            AuthRefreshTokenPlatformLoginResponseMapper.instance = new AuthRefreshTokenPlatformLoginResponseMapper();
        return AuthRefreshTokenPlatformLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformLoginResponseEntity): IAuthRefreshTokenPlatformLoginResponseDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformLoginResponseEntity[]): IAuthRefreshTokenPlatformLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformLoginResponseDTO): IAuthRefreshTokenPlatformLoginResponseEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformLoginResponseDTO[]): IAuthRefreshTokenPlatformLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}