import { Mapper } from "@bus/core/classes";
import { IAuthLoginPermissionResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginPermissionResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginPermissionResponseMapper extends Mapper<IAuthLoginPermissionResponseEntity, IAuthLoginPermissionResponseDTO> {

    private static instance: AuthLoginPermissionResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginPermissionResponseMapper {
        if (!AuthLoginPermissionResponseMapper.instance)
            AuthLoginPermissionResponseMapper.instance = new AuthLoginPermissionResponseMapper();
        return AuthLoginPermissionResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPermissionResponseEntity): IAuthLoginPermissionResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginPermissionResponseEntity[]): IAuthLoginPermissionResponseDTO[] {
        return params.map((param: IAuthLoginPermissionResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPermissionResponseDTO): IAuthLoginPermissionResponseEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginPermissionResponseDTO[]): IAuthLoginPermissionResponseEntity[] {
        return params.map((param: IAuthLoginPermissionResponseDTO) => {
            return this.mapTo(param);
        })
    }
}