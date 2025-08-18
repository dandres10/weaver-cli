import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCurrencyLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCurrencyLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCurrencyLoginResponseMapper extends Mapper<IAuthRefreshTokenCurrencyLoginResponseEntity, IAuthRefreshTokenCurrencyLoginResponseDTO> {

    private static instance: AuthRefreshTokenCurrencyLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCurrencyLoginResponseMapper {
        if (!AuthRefreshTokenCurrencyLoginResponseMapper.instance)
            AuthRefreshTokenCurrencyLoginResponseMapper.instance = new AuthRefreshTokenCurrencyLoginResponseMapper();
        return AuthRefreshTokenCurrencyLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCurrencyLoginResponseEntity): IAuthRefreshTokenCurrencyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCurrencyLoginResponseEntity[]): IAuthRefreshTokenCurrencyLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCurrencyLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCurrencyLoginResponseDTO): IAuthRefreshTokenCurrencyLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCurrencyLoginResponseDTO[]): IAuthRefreshTokenCurrencyLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCurrencyLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}