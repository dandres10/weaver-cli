import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPlatformEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginPlatformMapper extends Mapper<IAuthLoginPlatformEntity, IAuthLoginPlatformDTO> {

    private static instance: AuthLoginPlatformMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformMapper {
        if (!AuthLoginPlatformMapper.instance)
            AuthLoginPlatformMapper.instance = new AuthLoginPlatformMapper();
        return AuthLoginPlatformMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformEntity): IAuthLoginPlatformDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IAuthLoginPlatformEntity[]): IAuthLoginPlatformDTO[] {
        return params.map((param: IAuthLoginPlatformEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformDTO): IAuthLoginPlatformEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IAuthLoginPlatformDTO[]): IAuthLoginPlatformEntity[] {
        return params.map((param: IAuthLoginPlatformDTO) => {
            return this.mapTo(param);
        })
    }
}