import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCompanyResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCompanyResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCompanyResponseMapper extends Mapper<IAuthRefreshTokenCompanyResponseEntity, IAuthRefreshTokenCompanyResponseDTO> {

    private static instance: AuthRefreshTokenCompanyResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCompanyResponseMapper {
        if (!AuthRefreshTokenCompanyResponseMapper.instance)
            AuthRefreshTokenCompanyResponseMapper.instance = new AuthRefreshTokenCompanyResponseMapper();
        return AuthRefreshTokenCompanyResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCompanyResponseEntity): IAuthRefreshTokenCompanyResponseDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCompanyResponseEntity[]): IAuthRefreshTokenCompanyResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCompanyResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCompanyResponseDTO): IAuthRefreshTokenCompanyResponseEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCompanyResponseDTO[]): IAuthRefreshTokenCompanyResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCompanyResponseDTO) => {
            return this.mapTo(param);
        })
    }
}