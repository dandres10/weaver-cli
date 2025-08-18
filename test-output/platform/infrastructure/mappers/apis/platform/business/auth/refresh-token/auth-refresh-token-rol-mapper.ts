import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenRolResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenRolResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenRolResponseMapper extends Mapper<IAuthRefreshTokenRolResponseEntity, IAuthRefreshTokenRolResponseDTO> {

    private static instance: AuthRefreshTokenRolResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenRolResponseMapper {
        if (!AuthRefreshTokenRolResponseMapper.instance)
            AuthRefreshTokenRolResponseMapper.instance = new AuthRefreshTokenRolResponseMapper();
        return AuthRefreshTokenRolResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenRolResponseEntity): IAuthRefreshTokenRolResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenRolResponseEntity[]): IAuthRefreshTokenRolResponseDTO[] {
        return params.map((param: IAuthRefreshTokenRolResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenRolResponseDTO): IAuthRefreshTokenRolResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenRolResponseDTO[]): IAuthRefreshTokenRolResponseEntity[] {
        return params.map((param: IAuthRefreshTokenRolResponseDTO) => {
            return this.mapTo(param);
        })
    }
}