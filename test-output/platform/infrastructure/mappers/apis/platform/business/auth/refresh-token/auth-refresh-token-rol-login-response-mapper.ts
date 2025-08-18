import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenRolLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenRolLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenRolLoginResponseMapper extends Mapper<IAuthRefreshTokenRolLoginResponseEntity, IAuthRefreshTokenRolLoginResponseDTO> {

    private static instance: AuthRefreshTokenRolLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenRolLoginResponseMapper {
        if (!AuthRefreshTokenRolLoginResponseMapper.instance)
            AuthRefreshTokenRolLoginResponseMapper.instance = new AuthRefreshTokenRolLoginResponseMapper();
        return AuthRefreshTokenRolLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenRolLoginResponseEntity): IAuthRefreshTokenRolLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenRolLoginResponseEntity[]): IAuthRefreshTokenRolLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenRolLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenRolLoginResponseDTO): IAuthRefreshTokenRolLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenRolLoginResponseDTO[]): IAuthRefreshTokenRolLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenRolLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}