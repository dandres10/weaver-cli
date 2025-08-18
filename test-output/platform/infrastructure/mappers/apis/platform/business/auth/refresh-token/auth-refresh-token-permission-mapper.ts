import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPermissionDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPermissionEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenPermissionMapper extends Mapper<IAuthRefreshTokenPermissionEntity, IAuthRefreshTokenPermissionDTO> {

    private static instance: AuthRefreshTokenPermissionMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPermissionMapper {
        if (!AuthRefreshTokenPermissionMapper.instance)
            AuthRefreshTokenPermissionMapper.instance = new AuthRefreshTokenPermissionMapper();
        return AuthRefreshTokenPermissionMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPermissionEntity): IAuthRefreshTokenPermissionDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenPermissionEntity[]): IAuthRefreshTokenPermissionDTO[] {
        return params.map((param: IAuthRefreshTokenPermissionEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPermissionDTO): IAuthRefreshTokenPermissionEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenPermissionDTO[]): IAuthRefreshTokenPermissionEntity[] {
        return params.map((param: IAuthRefreshTokenPermissionDTO) => {
            return this.mapTo(param);
        })
    }
}