import { Mapper } from "@bus/core/classes";
import { IAuthLoginMenuResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginMenuResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginMenuResponseMapper extends Mapper<IAuthLoginMenuResponseEntity, IAuthLoginMenuResponseDTO> {

    private static instance: AuthLoginMenuResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginMenuResponseMapper {
        if (!AuthLoginMenuResponseMapper.instance)
            AuthLoginMenuResponseMapper.instance = new AuthLoginMenuResponseMapper();
        return AuthLoginMenuResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginMenuResponseEntity): IAuthLoginMenuResponseDTO {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            topId: param.top_id,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    public mapFromList(params: IAuthLoginMenuResponseEntity[]): IAuthLoginMenuResponseDTO[] {
        return params.map((param: IAuthLoginMenuResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginMenuResponseDTO): IAuthLoginMenuResponseEntity {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            top_id: param.topId,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    public mapToList(params: IAuthLoginMenuResponseDTO[]): IAuthLoginMenuResponseEntity[] {
        return params.map((param: IAuthLoginMenuResponseDTO) => {
            return this.mapTo(param);
        })
    }
}