import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCountryDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCountryEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCountryMapper extends Mapper<IAuthRefreshTokenCountryEntity, IAuthRefreshTokenCountryDTO> {

    private static instance: AuthRefreshTokenCountryMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCountryMapper {
        if (!AuthRefreshTokenCountryMapper.instance)
            AuthRefreshTokenCountryMapper.instance = new AuthRefreshTokenCountryMapper();
        return AuthRefreshTokenCountryMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCountryEntity): IAuthRefreshTokenCountryDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCountryEntity[]): IAuthRefreshTokenCountryDTO[] {
        return params.map((param: IAuthRefreshTokenCountryEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCountryDTO): IAuthRefreshTokenCountryEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCountryDTO[]): IAuthRefreshTokenCountryEntity[] {
        return params.map((param: IAuthRefreshTokenCountryDTO) => {
            return this.mapTo(param);
        })
    }
}