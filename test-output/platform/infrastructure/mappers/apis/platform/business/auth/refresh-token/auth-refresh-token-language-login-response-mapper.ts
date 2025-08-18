import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLanguageLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLanguageLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLanguageLoginResponseMapper extends Mapper<IAuthRefreshTokenLanguageLoginResponseEntity, IAuthRefreshTokenLanguageLoginResponseDTO> {

    private static instance: AuthRefreshTokenLanguageLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLanguageLoginResponseMapper {
        if (!AuthRefreshTokenLanguageLoginResponseMapper.instance)
            AuthRefreshTokenLanguageLoginResponseMapper.instance = new AuthRefreshTokenLanguageLoginResponseMapper();
        return AuthRefreshTokenLanguageLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLanguageLoginResponseEntity): IAuthRefreshTokenLanguageLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenLanguageLoginResponseEntity[]): IAuthRefreshTokenLanguageLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenLanguageLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLanguageLoginResponseDTO): IAuthRefreshTokenLanguageLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenLanguageLoginResponseDTO[]): IAuthRefreshTokenLanguageLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenLanguageLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}