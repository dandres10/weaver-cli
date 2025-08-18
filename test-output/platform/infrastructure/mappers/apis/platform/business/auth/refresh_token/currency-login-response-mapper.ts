import { Mapper } from "@bus/core/classes";
import { ICurrencyLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh_token";
import { ICurrencyLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh_token";

export class CurrencyLoginResponseMapper extends Mapper<ICurrencyLoginResponseEntity, ICurrencyLoginResponseDTO> {

    private static instance: CurrencyLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): CurrencyLoginResponseMapper {
        if (!CurrencyLoginResponseMapper.instance)
            CurrencyLoginResponseMapper.instance = new CurrencyLoginResponseMapper();
        return CurrencyLoginResponseMapper.instance;
    }

    public mapFrom(param: ICurrencyLoginResponseEntity): ICurrencyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapFromList(params: ICurrencyLoginResponseEntity[]): ICurrencyLoginResponseDTO[] {
        return params.map((param: ICurrencyLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICurrencyLoginResponseDTO): ICurrencyLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    public mapToList(params: ICurrencyLoginResponseDTO[]): ICurrencyLoginResponseEntity[] {
        return params.map((param: ICurrencyLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}