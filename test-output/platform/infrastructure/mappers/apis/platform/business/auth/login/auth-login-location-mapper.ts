import { Mapper } from "@bus/core/classes";
import { IAuthLoginLocationDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginLocationEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginLocationMapper extends Mapper<IAuthLoginLocationEntity, IAuthLoginLocationDTO> {

    private static instance: AuthLoginLocationMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginLocationMapper {
        if (!AuthLoginLocationMapper.instance)
            AuthLoginLocationMapper.instance = new AuthLoginLocationMapper();
        return AuthLoginLocationMapper.instance;
    }

    public mapFrom(param: IAuthLoginLocationEntity): IAuthLoginLocationDTO {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            mainLocation: param.main_location,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginLocationEntity[]): IAuthLoginLocationDTO[] {
        return params.map((param: IAuthLoginLocationEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginLocationDTO): IAuthLoginLocationEntity {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            main_location: param.mainLocation,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginLocationDTO[]): IAuthLoginLocationEntity[] {
        return params.map((param: IAuthLoginLocationDTO) => {
            return this.mapTo(param);
        })
    }
}