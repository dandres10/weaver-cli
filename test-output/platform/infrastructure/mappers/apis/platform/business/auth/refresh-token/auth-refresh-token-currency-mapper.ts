import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCurrencyDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCurrencyEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCurrencyMapper extends Mapper<IAuthRefreshTokenCurrencyEntity, IAuthRefreshTokenCurrencyDTO> {

    private static instance: AuthRefreshTokenCurrencyMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCurrencyMapper {
        if (!AuthRefreshTokenCurrencyMapper.instance)
            AuthRefreshTokenCurrencyMapper.instance = new AuthRefreshTokenCurrencyMapper();
        return AuthRefreshTokenCurrencyMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCurrencyEntity): IAuthRefreshTokenCurrencyDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCurrencyEntity[]): IAuthRefreshTokenCurrencyDTO[] {
        return params.map((param: IAuthRefreshTokenCurrencyEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCurrencyDTO): IAuthRefreshTokenCurrencyEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCurrencyDTO[]): IAuthRefreshTokenCurrencyEntity[] {
        return params.map((param: IAuthRefreshTokenCurrencyDTO) => {
            return this.mapTo(param);
        })
    }
}