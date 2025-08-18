import { Mapper } from "@bus/core/classes";
import { IPermissionLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh_token";
import { IPermissionLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh_token";

export class PermissionLoginResponseMapper extends Mapper<IPermissionLoginResponseEntity, IPermissionLoginResponseDTO> {

    private static instance: PermissionLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): PermissionLoginResponseMapper {
        if (!PermissionLoginResponseMapper.instance)
            PermissionLoginResponseMapper.instance = new PermissionLoginResponseMapper();
        return PermissionLoginResponseMapper.instance;
    }

    public mapFrom(param: IPermissionLoginResponseEntity): IPermissionLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IPermissionLoginResponseEntity[]): IPermissionLoginResponseDTO[] {
        return params.map((param: IPermissionLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPermissionLoginResponseDTO): IPermissionLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IPermissionLoginResponseDTO[]): IPermissionLoginResponseEntity[] {
        return params.map((param: IPermissionLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}