import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCurrencyResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCurrencyResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCurrencyResponseMapper extends Mapper<IAuthRefreshTokenCurrencyResponseEntity, IAuthRefreshTokenCurrencyResponseDTO> {

    private static instance: AuthRefreshTokenCurrencyResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCurrencyResponseMapper {
        if (!AuthRefreshTokenCurrencyResponseMapper.instance)
            AuthRefreshTokenCurrencyResponseMapper.instance = new AuthRefreshTokenCurrencyResponseMapper();
        return AuthRefreshTokenCurrencyResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCurrencyResponseEntity): IAuthRefreshTokenCurrencyResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCurrencyResponseEntity[]): IAuthRefreshTokenCurrencyResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCurrencyResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCurrencyResponseDTO): IAuthRefreshTokenCurrencyResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCurrencyResponseDTO[]): IAuthRefreshTokenCurrencyResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCurrencyResponseDTO) => {
            return this.mapTo(param);
        })
    }
}