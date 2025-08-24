import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginPlatformResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginPlatformResponseMapper extends Mapper<IAuthLoginPlatformResponseEntity, IAuthLoginPlatformResponseDTO> {

    private static instance: AuthLoginPlatformResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformResponseMapper {
        if (!AuthLoginPlatformResponseMapper.instance)
            AuthLoginPlatformResponseMapper.instance = new AuthLoginPlatformResponseMapper();
        return AuthLoginPlatformResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformResponseEntity): IAuthLoginPlatformResponseDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IAuthLoginPlatformResponseEntity[]): IAuthLoginPlatformResponseDTO[] {
        return params.map((param: IAuthLoginPlatformResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformResponseDTO): IAuthLoginPlatformResponseEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IAuthLoginPlatformResponseDTO[]): IAuthLoginPlatformResponseEntity[] {
        return params.map((param: IAuthLoginPlatformResponseDTO) => {
            return this.mapTo(param);
        })
    }
}