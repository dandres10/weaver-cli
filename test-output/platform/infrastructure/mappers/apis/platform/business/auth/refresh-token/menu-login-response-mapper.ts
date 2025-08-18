import { Mapper } from "@bus/core/classes";
import { IMenuLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IMenuLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class MenuLoginResponseMapper extends Mapper<IMenuLoginResponseEntity, IMenuLoginResponseDTO> {

    private static instance: MenuLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): MenuLoginResponseMapper {
        if (!MenuLoginResponseMapper.instance)
            MenuLoginResponseMapper.instance = new MenuLoginResponseMapper();
        return MenuLoginResponseMapper.instance;
    }

    public mapFrom(param: IMenuLoginResponseEntity): IMenuLoginResponseDTO {
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

    public mapFromList(params: IMenuLoginResponseEntity[]): IMenuLoginResponseDTO[] {
        return params.map((param: IMenuLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IMenuLoginResponseDTO): IMenuLoginResponseEntity {
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

    public mapToList(params: IMenuLoginResponseDTO[]): IMenuLoginResponseEntity[] {
        return params.map((param: IMenuLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}