import { Mapper } from "@bus/core/classes";
import { IAuthLoginUserResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginUserResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginUserResponseMapper extends Mapper<IAuthLoginUserResponseEntity, IAuthLoginUserResponseDTO> {

    private static instance: AuthLoginUserResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginUserResponseMapper {
        if (!AuthLoginUserResponseMapper.instance)
            AuthLoginUserResponseMapper.instance = new AuthLoginUserResponseMapper();
        return AuthLoginUserResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginUserResponseEntity): IAuthLoginUserResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginUserResponseEntity[]): IAuthLoginUserResponseDTO[] {
        return params.map((param: IAuthLoginUserResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginUserResponseDTO): IAuthLoginUserResponseEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginUserResponseDTO[]): IAuthLoginUserResponseEntity[] {
        return params.map((param: IAuthLoginUserResponseDTO) => {
            return this.mapTo(param);
        })
    }
}