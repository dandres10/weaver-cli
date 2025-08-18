import { Mapper } from "@bus/core/classes";
import { ICountryLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { ICountryLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class CountryLoginResponseMapper extends Mapper<ICountryLoginResponseEntity, ICountryLoginResponseDTO> {

    private static instance: CountryLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): CountryLoginResponseMapper {
        if (!CountryLoginResponseMapper.instance)
            CountryLoginResponseMapper.instance = new CountryLoginResponseMapper();
        return CountryLoginResponseMapper.instance;
    }

    public mapFrom(param: ICountryLoginResponseEntity): ICountryLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: ICountryLoginResponseEntity[]): ICountryLoginResponseDTO[] {
        return params.map((param: ICountryLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICountryLoginResponseDTO): ICountryLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: ICountryLoginResponseDTO[]): ICountryLoginResponseEntity[] {
        return params.map((param: ICountryLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}