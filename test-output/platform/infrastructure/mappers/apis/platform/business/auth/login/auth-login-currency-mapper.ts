import { Mapper } from "@bus/core/classes";
import { IAuthLoginCurrencyDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginCurrencyEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginCurrencyMapper extends Mapper<IAuthLoginCurrencyEntity, IAuthLoginCurrencyDTO> {

    private static instance: AuthLoginCurrencyMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCurrencyMapper {
        if (!AuthLoginCurrencyMapper.instance)
            AuthLoginCurrencyMapper.instance = new AuthLoginCurrencyMapper();
        return AuthLoginCurrencyMapper.instance;
    }

    public mapFrom(param: IAuthLoginCurrencyEntity): IAuthLoginCurrencyDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCurrencyEntity[]): IAuthLoginCurrencyDTO[] {
        return params.map((param: IAuthLoginCurrencyEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCurrencyDTO): IAuthLoginCurrencyEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCurrencyDTO[]): IAuthLoginCurrencyEntity[] {
        return params.map((param: IAuthLoginCurrencyDTO) => {
            return this.mapTo(param);
        })
    }
}