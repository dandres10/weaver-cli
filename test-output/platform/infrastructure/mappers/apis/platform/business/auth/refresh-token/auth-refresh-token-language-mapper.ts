import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLanguageDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLanguageEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLanguageMapper extends Mapper<IAuthRefreshTokenLanguageEntity, IAuthRefreshTokenLanguageDTO> {

    private static instance: AuthRefreshTokenLanguageMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLanguageMapper {
        if (!AuthRefreshTokenLanguageMapper.instance)
            AuthRefreshTokenLanguageMapper.instance = new AuthRefreshTokenLanguageMapper();
        return AuthRefreshTokenLanguageMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLanguageEntity): IAuthRefreshTokenLanguageDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenLanguageEntity[]): IAuthRefreshTokenLanguageDTO[] {
        return params.map((param: IAuthRefreshTokenLanguageEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLanguageDTO): IAuthRefreshTokenLanguageEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenLanguageDTO[]): IAuthRefreshTokenLanguageEntity[] {
        return params.map((param: IAuthRefreshTokenLanguageDTO) => {
            return this.mapTo(param);
        })
    }
}