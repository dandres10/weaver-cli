import { Mapper } from "@bus/core/classes";
import { IAuthLoginPermissionDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPermissionEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginPermissionMapper extends Mapper<IAuthLoginPermissionEntity, IAuthLoginPermissionDTO> {

    private static instance: AuthLoginPermissionMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginPermissionMapper {
        if (!AuthLoginPermissionMapper.instance)
            AuthLoginPermissionMapper.instance = new AuthLoginPermissionMapper();
        return AuthLoginPermissionMapper.instance;
    }

    public mapFrom(param: IAuthLoginPermissionEntity): IAuthLoginPermissionDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginPermissionEntity[]): IAuthLoginPermissionDTO[] {
        return params.map((param: IAuthLoginPermissionEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPermissionDTO): IAuthLoginPermissionEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginPermissionDTO[]): IAuthLoginPermissionEntity[] {
        return params.map((param: IAuthLoginPermissionDTO) => {
            return this.mapTo(param);
        })
    }
}