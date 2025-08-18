import { Mapper } from "@bus/core/classes";
import { IAuthLoginMenuDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginMenuEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginMenuMapper extends Mapper<IAuthLoginMenuEntity, IAuthLoginMenuDTO> {

    private static instance: AuthLoginMenuMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginMenuMapper {
        if (!AuthLoginMenuMapper.instance)
            AuthLoginMenuMapper.instance = new AuthLoginMenuMapper();
        return AuthLoginMenuMapper.instance;
    }

    public mapFrom(param: IAuthLoginMenuEntity): IAuthLoginMenuDTO {
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

    public mapFromList(params: IAuthLoginMenuEntity[]): IAuthLoginMenuDTO[] {
        return params.map((param: IAuthLoginMenuEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginMenuDTO): IAuthLoginMenuEntity {
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

    public mapToList(params: IAuthLoginMenuDTO[]): IAuthLoginMenuEntity[] {
        return params.map((param: IAuthLoginMenuDTO) => {
            return this.mapTo(param);
        })
    }
}