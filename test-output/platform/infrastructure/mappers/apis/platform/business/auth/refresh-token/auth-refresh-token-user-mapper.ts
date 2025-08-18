import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenUserDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenUserEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenUserMapper extends Mapper<IAuthRefreshTokenUserEntity, IAuthRefreshTokenUserDTO> {

    private static instance: AuthRefreshTokenUserMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenUserMapper {
        if (!AuthRefreshTokenUserMapper.instance)
            AuthRefreshTokenUserMapper.instance = new AuthRefreshTokenUserMapper();
        return AuthRefreshTokenUserMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenUserEntity): IAuthRefreshTokenUserDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenUserEntity[]): IAuthRefreshTokenUserDTO[] {
        return params.map((param: IAuthRefreshTokenUserEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenUserDTO): IAuthRefreshTokenUserEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenUserDTO[]): IAuthRefreshTokenUserEntity[] {
        return params.map((param: IAuthRefreshTokenUserDTO) => {
            return this.mapTo(param);
        })
    }
}