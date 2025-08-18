import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCountryResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCountryResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCountryResponseMapper extends Mapper<IAuthRefreshTokenCountryResponseEntity, IAuthRefreshTokenCountryResponseDTO> {

    private static instance: AuthRefreshTokenCountryResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCountryResponseMapper {
        if (!AuthRefreshTokenCountryResponseMapper.instance)
            AuthRefreshTokenCountryResponseMapper.instance = new AuthRefreshTokenCountryResponseMapper();
        return AuthRefreshTokenCountryResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCountryResponseEntity): IAuthRefreshTokenCountryResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCountryResponseEntity[]): IAuthRefreshTokenCountryResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCountryResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCountryResponseDTO): IAuthRefreshTokenCountryResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCountryResponseDTO[]): IAuthRefreshTokenCountryResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCountryResponseDTO) => {
            return this.mapTo(param);
        })
    }
}