import { Mapper } from "@bus/core/classes";
import { IAuthLoginCompanyResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginCompanyResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginCompanyResponseMapper extends Mapper<IAuthLoginCompanyResponseEntity, IAuthLoginCompanyResponseDTO> {

    private static instance: AuthLoginCompanyResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCompanyResponseMapper {
        if (!AuthLoginCompanyResponseMapper.instance)
            AuthLoginCompanyResponseMapper.instance = new AuthLoginCompanyResponseMapper();
        return AuthLoginCompanyResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginCompanyResponseEntity): IAuthLoginCompanyResponseDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCompanyResponseEntity[]): IAuthLoginCompanyResponseDTO[] {
        return params.map((param: IAuthLoginCompanyResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCompanyResponseDTO): IAuthLoginCompanyResponseEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCompanyResponseDTO[]): IAuthLoginCompanyResponseEntity[] {
        return params.map((param: IAuthLoginCompanyResponseDTO) => {
            return this.mapTo(param);
        })
    }
}