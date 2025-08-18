import { Mapper } from "@bus/core/classes";
import { IAuthLoginLanguageDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginLanguageEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginLanguageMapper extends Mapper<IAuthLoginLanguageEntity, IAuthLoginLanguageDTO> {

    private static instance: AuthLoginLanguageMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginLanguageMapper {
        if (!AuthLoginLanguageMapper.instance)
            AuthLoginLanguageMapper.instance = new AuthLoginLanguageMapper();
        return AuthLoginLanguageMapper.instance;
    }

    public mapFrom(param: IAuthLoginLanguageEntity): IAuthLoginLanguageDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginLanguageEntity[]): IAuthLoginLanguageDTO[] {
        return params.map((param: IAuthLoginLanguageEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginLanguageDTO): IAuthLoginLanguageEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginLanguageDTO[]): IAuthLoginLanguageEntity[] {
        return params.map((param: IAuthLoginLanguageDTO) => {
            return this.mapTo(param);
        })
    }
}