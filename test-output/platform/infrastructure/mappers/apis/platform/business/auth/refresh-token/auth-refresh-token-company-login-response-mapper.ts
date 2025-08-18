import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCompanyLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCompanyLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCompanyLoginResponseMapper extends Mapper<IAuthRefreshTokenCompanyLoginResponseEntity, IAuthRefreshTokenCompanyLoginResponseDTO> {

    private static instance: AuthRefreshTokenCompanyLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCompanyLoginResponseMapper {
        if (!AuthRefreshTokenCompanyLoginResponseMapper.instance)
            AuthRefreshTokenCompanyLoginResponseMapper.instance = new AuthRefreshTokenCompanyLoginResponseMapper();
        return AuthRefreshTokenCompanyLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCompanyLoginResponseEntity): IAuthRefreshTokenCompanyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCompanyLoginResponseEntity[]): IAuthRefreshTokenCompanyLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenCompanyLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCompanyLoginResponseDTO): IAuthRefreshTokenCompanyLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCompanyLoginResponseDTO[]): IAuthRefreshTokenCompanyLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenCompanyLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}