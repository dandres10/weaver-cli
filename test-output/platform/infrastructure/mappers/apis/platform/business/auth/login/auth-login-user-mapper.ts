import { Mapper } from "@bus/core/classes";
import { IAuthLoginUserDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginUserEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginUserMapper extends Mapper<IAuthLoginUserEntity, IAuthLoginUserDTO> {

    private static instance: AuthLoginUserMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginUserMapper {
        if (!AuthLoginUserMapper.instance)
            AuthLoginUserMapper.instance = new AuthLoginUserMapper();
        return AuthLoginUserMapper.instance;
    }

    public mapFrom(param: IAuthLoginUserEntity): IAuthLoginUserDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginUserEntity[]): IAuthLoginUserDTO[] {
        return params.map((param: IAuthLoginUserEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginUserDTO): IAuthLoginUserEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginUserDTO[]): IAuthLoginUserEntity[] {
        return params.map((param: IAuthLoginUserDTO) => {
            return this.mapTo(param);
        })
    }
}