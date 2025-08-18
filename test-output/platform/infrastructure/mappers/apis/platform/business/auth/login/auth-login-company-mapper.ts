import { Mapper } from "@bus/core/classes";
import { IAuthLoginCompanyDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginCompanyEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginCompanyMapper extends Mapper<IAuthLoginCompanyEntity, IAuthLoginCompanyDTO> {

    private static instance: AuthLoginCompanyMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCompanyMapper {
        if (!AuthLoginCompanyMapper.instance)
            AuthLoginCompanyMapper.instance = new AuthLoginCompanyMapper();
        return AuthLoginCompanyMapper.instance;
    }

    public mapFrom(param: IAuthLoginCompanyEntity): IAuthLoginCompanyDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCompanyEntity[]): IAuthLoginCompanyDTO[] {
        return params.map((param: IAuthLoginCompanyEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCompanyDTO): IAuthLoginCompanyEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCompanyDTO[]): IAuthLoginCompanyEntity[] {
        return params.map((param: IAuthLoginCompanyDTO) => {
            return this.mapTo(param);
        })
    }
}