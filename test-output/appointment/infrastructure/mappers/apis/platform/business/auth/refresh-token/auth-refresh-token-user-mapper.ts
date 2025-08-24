import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenUserResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenUserResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthRefreshTokenUserResponseMapper extends Mapper<IAuthRefreshTokenUserResponseEntity, IAuthRefreshTokenUserResponseDTO> {

    private static instance: AuthRefreshTokenUserResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenUserResponseMapper {
        if (!AuthRefreshTokenUserResponseMapper.instance)
            AuthRefreshTokenUserResponseMapper.instance = new AuthRefreshTokenUserResponseMapper();
        return AuthRefreshTokenUserResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenUserResponseEntity): IAuthRefreshTokenUserResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenUserResponseEntity[]): IAuthRefreshTokenUserResponseDTO[] {
        return params.map((param: IAuthRefreshTokenUserResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenUserResponseDTO): IAuthRefreshTokenUserResponseEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenUserResponseDTO[]): IAuthRefreshTokenUserResponseEntity[] {
        return params.map((param: IAuthRefreshTokenUserResponseDTO) => {
            return this.mapTo(param);
        })
    }
}