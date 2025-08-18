import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenRolDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenRolEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenRolMapper extends Mapper<IAuthRefreshTokenRolEntity, IAuthRefreshTokenRolDTO> {

    private static instance: AuthRefreshTokenRolMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenRolMapper {
        if (!AuthRefreshTokenRolMapper.instance)
            AuthRefreshTokenRolMapper.instance = new AuthRefreshTokenRolMapper();
        return AuthRefreshTokenRolMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenRolEntity): IAuthRefreshTokenRolDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenRolEntity[]): IAuthRefreshTokenRolDTO[] {
        return params.map((param: IAuthRefreshTokenRolEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenRolDTO): IAuthRefreshTokenRolEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenRolDTO[]): IAuthRefreshTokenRolEntity[] {
        return params.map((param: IAuthRefreshTokenRolDTO) => {
            return this.mapTo(param);
        })
    }
}