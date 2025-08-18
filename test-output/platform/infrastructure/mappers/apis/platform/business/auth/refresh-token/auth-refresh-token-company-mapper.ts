import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenCompanyDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenCompanyEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenCompanyMapper extends Mapper<IAuthRefreshTokenCompanyEntity, IAuthRefreshTokenCompanyDTO> {

    private static instance: AuthRefreshTokenCompanyMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenCompanyMapper {
        if (!AuthRefreshTokenCompanyMapper.instance)
            AuthRefreshTokenCompanyMapper.instance = new AuthRefreshTokenCompanyMapper();
        return AuthRefreshTokenCompanyMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenCompanyEntity): IAuthRefreshTokenCompanyDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: IAuthRefreshTokenCompanyEntity[]): IAuthRefreshTokenCompanyDTO[] {
        return params.map((param: IAuthRefreshTokenCompanyEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenCompanyDTO): IAuthRefreshTokenCompanyEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: IAuthRefreshTokenCompanyDTO[]): IAuthRefreshTokenCompanyEntity[] {
        return params.map((param: IAuthRefreshTokenCompanyDTO) => {
            return this.mapTo(param);
        })
    }
}