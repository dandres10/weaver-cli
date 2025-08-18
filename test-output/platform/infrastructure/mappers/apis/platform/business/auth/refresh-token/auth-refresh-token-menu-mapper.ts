import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenMenuDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenMenuEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenMenuMapper extends Mapper<IAuthRefreshTokenMenuEntity, IAuthRefreshTokenMenuDTO> {

    private static instance: AuthRefreshTokenMenuMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenMenuMapper {
        if (!AuthRefreshTokenMenuMapper.instance)
            AuthRefreshTokenMenuMapper.instance = new AuthRefreshTokenMenuMapper();
        return AuthRefreshTokenMenuMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenMenuEntity): IAuthRefreshTokenMenuDTO {
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

    public mapFromList(params: IAuthRefreshTokenMenuEntity[]): IAuthRefreshTokenMenuDTO[] {
        return params.map((param: IAuthRefreshTokenMenuEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenMenuDTO): IAuthRefreshTokenMenuEntity {
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

    public mapToList(params: IAuthRefreshTokenMenuDTO[]): IAuthRefreshTokenMenuEntity[] {
        return params.map((param: IAuthRefreshTokenMenuDTO) => {
            return this.mapTo(param);
        })
    }
}