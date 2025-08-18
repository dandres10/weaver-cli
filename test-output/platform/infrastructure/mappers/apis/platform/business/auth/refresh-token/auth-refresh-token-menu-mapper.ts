import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenMenuResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenMenuResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthRefreshTokenMenuResponseMapper extends Mapper<IAuthRefreshTokenMenuResponseEntity, IAuthRefreshTokenMenuResponseDTO> {

    private static instance: AuthRefreshTokenMenuResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenMenuResponseMapper {
        if (!AuthRefreshTokenMenuResponseMapper.instance)
            AuthRefreshTokenMenuResponseMapper.instance = new AuthRefreshTokenMenuResponseMapper();
        return AuthRefreshTokenMenuResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenMenuResponseEntity): IAuthRefreshTokenMenuResponseDTO {
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

    public mapFromList(params: IAuthRefreshTokenMenuResponseEntity[]): IAuthRefreshTokenMenuResponseDTO[] {
        return params.map((param: IAuthRefreshTokenMenuResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenMenuResponseDTO): IAuthRefreshTokenMenuResponseEntity {
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

    public mapToList(params: IAuthRefreshTokenMenuResponseDTO[]): IAuthRefreshTokenMenuResponseEntity[] {
        return params.map((param: IAuthRefreshTokenMenuResponseDTO) => {
            return this.mapTo(param);
        })
    }
}