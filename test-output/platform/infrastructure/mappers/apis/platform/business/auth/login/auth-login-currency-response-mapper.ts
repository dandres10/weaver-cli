import { Mapper } from "@bus/core/classes";
import { IAuthLoginCurrencyResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginCurrencyResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginCurrencyResponseMapper extends Mapper<IAuthLoginCurrencyResponseEntity, IAuthLoginCurrencyResponseDTO> {

    private static instance: AuthLoginCurrencyResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCurrencyResponseMapper {
        if (!AuthLoginCurrencyResponseMapper.instance)
            AuthLoginCurrencyResponseMapper.instance = new AuthLoginCurrencyResponseMapper();
        return AuthLoginCurrencyResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginCurrencyResponseEntity): IAuthLoginCurrencyResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCurrencyResponseEntity[]): IAuthLoginCurrencyResponseDTO[] {
        return params.map((param: IAuthLoginCurrencyResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCurrencyResponseDTO): IAuthLoginCurrencyResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCurrencyResponseDTO[]): IAuthLoginCurrencyResponseEntity[] {
        return params.map((param: IAuthLoginCurrencyResponseDTO) => {
            return this.mapTo(param);
        })
    }
}