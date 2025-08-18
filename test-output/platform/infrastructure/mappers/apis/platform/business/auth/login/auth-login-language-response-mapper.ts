import { Mapper } from "@bus/core/classes";
import { IAuthLoginLanguageResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginLanguageResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginLanguageResponseMapper extends Mapper<IAuthLoginLanguageResponseEntity, IAuthLoginLanguageResponseDTO> {

    private static instance: AuthLoginLanguageResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginLanguageResponseMapper {
        if (!AuthLoginLanguageResponseMapper.instance)
            AuthLoginLanguageResponseMapper.instance = new AuthLoginLanguageResponseMapper();
        return AuthLoginLanguageResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginLanguageResponseEntity): IAuthLoginLanguageResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginLanguageResponseEntity[]): IAuthLoginLanguageResponseDTO[] {
        return params.map((param: IAuthLoginLanguageResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginLanguageResponseDTO): IAuthLoginLanguageResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginLanguageResponseDTO[]): IAuthLoginLanguageResponseEntity[] {
        return params.map((param: IAuthLoginLanguageResponseDTO) => {
            return this.mapTo(param);
        })
    }
}