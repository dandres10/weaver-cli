import { Mapper } from "@bus/core/classes";
import { IAuthLogoutResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLogoutResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLogoutResponseMapper extends Mapper<IAuthLogoutResponseEntity, IAuthLogoutResponseDTO> {

    private static instance: AuthLogoutResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLogoutResponseMapper {
        if (!AuthLogoutResponseMapper.instance)
            AuthLogoutResponseMapper.instance = new AuthLogoutResponseMapper();
        return AuthLogoutResponseMapper.instance;
    }

    public mapFrom(param: IAuthLogoutResponseEntity): IAuthLogoutResponseDTO {
        return {
            message: param.message
        }
    }

    public mapFromList(params: IAuthLogoutResponseEntity[]): IAuthLogoutResponseDTO[] {
        return params.map((param: IAuthLogoutResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLogoutResponseDTO): IAuthLogoutResponseEntity {
        return {
            message: param.message
        }
    }

    public mapToList(params: IAuthLogoutResponseDTO[]): IAuthLogoutResponseEntity[] {
        return params.map((param: IAuthLogoutResponseDTO) => {
            return this.mapTo(param);
        })
    }
}