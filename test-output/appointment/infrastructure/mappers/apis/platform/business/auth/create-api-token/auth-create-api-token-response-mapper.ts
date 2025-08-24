import { Mapper } from "@bus/core/classes";
import { IAuthCreateApiTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthCreateApiTokenResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthCreateApiTokenResponseMapper extends Mapper<IAuthCreateApiTokenResponseEntity, IAuthCreateApiTokenResponseDTO> {

    private static instance: AuthCreateApiTokenResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthCreateApiTokenResponseMapper {
        if (!AuthCreateApiTokenResponseMapper.instance)
            AuthCreateApiTokenResponseMapper.instance = new AuthCreateApiTokenResponseMapper();
        return AuthCreateApiTokenResponseMapper.instance;
    }

    public mapFrom(param: IAuthCreateApiTokenResponseEntity): IAuthCreateApiTokenResponseDTO {
        return {
            rolId: param.rol_id,
            rolCode: param.rol_code,
            permissions: param.permissions
        }
    }

    public mapFromList(params: IAuthCreateApiTokenResponseEntity[]): IAuthCreateApiTokenResponseDTO[] {
        return params.map((param: IAuthCreateApiTokenResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthCreateApiTokenResponseDTO): IAuthCreateApiTokenResponseEntity {
        return {
            rol_id: param.rolId,
            rol_code: param.rolCode,
            permissions: param.permissions
        }
    }

    public mapToList(params: IAuthCreateApiTokenResponseDTO[]): IAuthCreateApiTokenResponseEntity[] {
        return params.map((param: IAuthCreateApiTokenResponseDTO) => {
            return this.mapTo(param);
        })
    }
}