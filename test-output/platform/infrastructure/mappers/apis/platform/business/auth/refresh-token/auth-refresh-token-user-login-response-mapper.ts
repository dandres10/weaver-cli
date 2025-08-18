import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenUserLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenUserLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenUserLoginResponseMapper extends Mapper<IAuthRefreshTokenUserLoginResponseEntity, IAuthRefreshTokenUserLoginResponseDTO> {

    private static instance: AuthRefreshTokenUserLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenUserLoginResponseMapper {
        if (!AuthRefreshTokenUserLoginResponseMapper.instance)
            AuthRefreshTokenUserLoginResponseMapper.instance = new AuthRefreshTokenUserLoginResponseMapper();
        return AuthRefreshTokenUserLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenUserLoginResponseEntity): IAuthRefreshTokenUserLoginResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenUserLoginResponseEntity[]): IAuthRefreshTokenUserLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenUserLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenUserLoginResponseDTO): IAuthRefreshTokenUserLoginResponseEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenUserLoginResponseDTO[]): IAuthRefreshTokenUserLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenUserLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}