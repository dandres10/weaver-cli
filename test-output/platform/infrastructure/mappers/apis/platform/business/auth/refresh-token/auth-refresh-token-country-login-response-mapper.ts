import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCountryLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCountryLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCountryLoginResponseMapper extends Mapper<IAuthRefreshTokenCountryLoginResponseEntity, IAuthRefreshTokenCountryLoginResponseDTO> {

    private static instance: AuthRefreshTokenCountryLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCountryLoginResponseMapper {
        if (!AuthRefreshTokenCountryLoginResponseMapper.instance)
            AuthRefreshTokenCountryLoginResponseMapper.instance = new AuthRefreshTokenCountryLoginResponseMapper();
        return AuthRefreshTokenCountryLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCountryLoginResponseEntity): IAuthRefreshTokenCountryLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCountryLoginResponseEntity[]): IAuthRefreshTokenCountryLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCountryLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCountryLoginResponseDTO): IAuthRefreshTokenCountryLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCountryLoginResponseDTO[]): IAuthRefreshTokenCountryLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCountryLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}