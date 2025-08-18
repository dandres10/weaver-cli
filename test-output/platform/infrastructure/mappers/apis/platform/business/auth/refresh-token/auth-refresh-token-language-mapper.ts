import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLanguageResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLanguageResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLanguageResponseMapper extends Mapper<IAuthRefreshTokenLanguageResponseEntity, IAuthRefreshTokenLanguageResponseDTO> {

    private static instance: AuthRefreshTokenLanguageResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLanguageResponseMapper {
        if (!AuthRefreshTokenLanguageResponseMapper.instance)
            AuthRefreshTokenLanguageResponseMapper.instance = new AuthRefreshTokenLanguageResponseMapper();
        return AuthRefreshTokenLanguageResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLanguageResponseEntity): IAuthRefreshTokenLanguageResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenLanguageResponseEntity[]): IAuthRefreshTokenLanguageResponseDTO[] {
        return params.map((param: IAuthRefreshTokenLanguageResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLanguageResponseDTO): IAuthRefreshTokenLanguageResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenLanguageResponseDTO[]): IAuthRefreshTokenLanguageResponseEntity[] {
        return params.map((param: IAuthRefreshTokenLanguageResponseDTO) => {
            return this.mapTo(param);
        })
    }
}