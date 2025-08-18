import { Mapper } from "@bus/core/classes";
import { IAuthLoginRolResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginRolResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginRolResponseMapper extends Mapper<IAuthLoginRolResponseEntity, IAuthLoginRolResponseDTO> {

    private static instance: AuthLoginRolResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginRolResponseMapper {
        if (!AuthLoginRolResponseMapper.instance)
            AuthLoginRolResponseMapper.instance = new AuthLoginRolResponseMapper();
        return AuthLoginRolResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginRolResponseEntity): IAuthLoginRolResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginRolResponseEntity[]): IAuthLoginRolResponseDTO[] {
        return params.map((param: IAuthLoginRolResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginRolResponseDTO): IAuthLoginRolResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginRolResponseDTO[]): IAuthLoginRolResponseEntity[] {
        return params.map((param: IAuthLoginRolResponseDTO) => {
            return this.mapTo(param);
        })
    }
}