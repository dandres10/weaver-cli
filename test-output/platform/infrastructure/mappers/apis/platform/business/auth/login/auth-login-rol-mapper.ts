import { Mapper } from "@bus/core/classes";
import { IAuthLoginRolDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginRolEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginRolMapper extends Mapper<IAuthLoginRolEntity, IAuthLoginRolDTO> {

    private static instance: AuthLoginRolMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginRolMapper {
        if (!AuthLoginRolMapper.instance)
            AuthLoginRolMapper.instance = new AuthLoginRolMapper();
        return AuthLoginRolMapper.instance;
    }

    public mapFrom(param: IAuthLoginRolEntity): IAuthLoginRolDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginRolEntity[]): IAuthLoginRolDTO[] {
        return params.map((param: IAuthLoginRolEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginRolDTO): IAuthLoginRolEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginRolDTO[]): IAuthLoginRolEntity[] {
        return params.map((param: IAuthLoginRolDTO) => {
            return this.mapTo(param);
        })
    }
}