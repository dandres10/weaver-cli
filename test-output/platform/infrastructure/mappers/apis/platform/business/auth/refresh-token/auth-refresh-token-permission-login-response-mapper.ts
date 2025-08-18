import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPermissionLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPermissionLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenPermissionLoginResponseMapper extends Mapper<IAuthRefreshTokenPermissionLoginResponseEntity, IAuthRefreshTokenPermissionLoginResponseDTO> {

    private static instance: AuthRefreshTokenPermissionLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPermissionLoginResponseMapper {
        if (!AuthRefreshTokenPermissionLoginResponseMapper.instance)
            AuthRefreshTokenPermissionLoginResponseMapper.instance = new AuthRefreshTokenPermissionLoginResponseMapper();
        return AuthRefreshTokenPermissionLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPermissionLoginResponseEntity): IAuthRefreshTokenPermissionLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenPermissionLoginResponseEntity[]): IAuthRefreshTokenPermissionLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPermissionLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPermissionLoginResponseDTO): IAuthRefreshTokenPermissionLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenPermissionLoginResponseDTO[]): IAuthRefreshTokenPermissionLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPermissionLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}