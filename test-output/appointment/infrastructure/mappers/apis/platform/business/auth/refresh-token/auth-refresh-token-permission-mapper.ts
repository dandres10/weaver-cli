import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPermissionResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPermissionResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthRefreshTokenPermissionResponseMapper extends Mapper<IAuthRefreshTokenPermissionResponseEntity, IAuthRefreshTokenPermissionResponseDTO> {

    private static instance: AuthRefreshTokenPermissionResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPermissionResponseMapper {
        if (!AuthRefreshTokenPermissionResponseMapper.instance)
            AuthRefreshTokenPermissionResponseMapper.instance = new AuthRefreshTokenPermissionResponseMapper();
        return AuthRefreshTokenPermissionResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPermissionResponseEntity): IAuthRefreshTokenPermissionResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenPermissionResponseEntity[]): IAuthRefreshTokenPermissionResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPermissionResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPermissionResponseDTO): IAuthRefreshTokenPermissionResponseEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenPermissionResponseDTO[]): IAuthRefreshTokenPermissionResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPermissionResponseDTO) => {
            return this.mapTo(param);
        })
    }
}