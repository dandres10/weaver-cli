import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenMenuLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenMenuLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenMenuLoginResponseMapper extends Mapper<IAuthRefreshTokenMenuLoginResponseEntity, IAuthRefreshTokenMenuLoginResponseDTO> {

    private static instance: AuthRefreshTokenMenuLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenMenuLoginResponseMapper {
        if (!AuthRefreshTokenMenuLoginResponseMapper.instance)
            AuthRefreshTokenMenuLoginResponseMapper.instance = new AuthRefreshTokenMenuLoginResponseMapper();
        return AuthRefreshTokenMenuLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenMenuLoginResponseEntity): IAuthRefreshTokenMenuLoginResponseDTO {
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

    public mapFromList(params: IAuthRefreshTokenMenuLoginResponseEntity[]): IAuthRefreshTokenMenuLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenMenuLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenMenuLoginResponseDTO): IAuthRefreshTokenMenuLoginResponseEntity {
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

    public mapToList(params: IAuthRefreshTokenMenuLoginResponseDTO[]): IAuthRefreshTokenMenuLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenMenuLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}