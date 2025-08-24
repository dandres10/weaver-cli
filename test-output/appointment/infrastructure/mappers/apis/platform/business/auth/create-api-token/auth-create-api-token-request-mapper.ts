import { Mapper } from "@bus/core/classes";
import { IAuthCreateApiTokenRequestDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthCreateApiTokenRequestEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthCreateApiTokenRequestMapper extends Mapper<IAuthCreateApiTokenRequestEntity, IAuthCreateApiTokenRequestDTO> {

    private static instance: AuthCreateApiTokenRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AuthCreateApiTokenRequestMapper {
        if (!AuthCreateApiTokenRequestMapper.instance)
            AuthCreateApiTokenRequestMapper.instance = new AuthCreateApiTokenRequestMapper();
        return AuthCreateApiTokenRequestMapper.instance;
    }

    public mapFrom(param: IAuthCreateApiTokenRequestEntity): IAuthCreateApiTokenRequestDTO {
        return {
            rolId: param.rol_id
        }
    }

    public mapFromList(params: IAuthCreateApiTokenRequestEntity[]): IAuthCreateApiTokenRequestDTO[] {
        return params.map((param: IAuthCreateApiTokenRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthCreateApiTokenRequestDTO): IAuthCreateApiTokenRequestEntity {
        return {
            rol_id: param.rolId
        }
    }

    public mapToList(params: IAuthCreateApiTokenRequestDTO[]): IAuthCreateApiTokenRequestEntity[] {
        return params.map((param: IAuthCreateApiTokenRequestDTO) => {
            return this.mapTo(param);
        })
    }
}