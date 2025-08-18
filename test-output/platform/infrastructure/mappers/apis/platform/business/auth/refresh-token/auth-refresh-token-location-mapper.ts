import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLocationDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLocationEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLocationMapper extends Mapper<IAuthRefreshTokenLocationEntity, IAuthRefreshTokenLocationDTO> {

    private static instance: AuthRefreshTokenLocationMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLocationMapper {
        if (!AuthRefreshTokenLocationMapper.instance)
            AuthRefreshTokenLocationMapper.instance = new AuthRefreshTokenLocationMapper();
        return AuthRefreshTokenLocationMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLocationEntity): IAuthRefreshTokenLocationDTO {
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

    public mapFromList(params: IAuthRefreshTokenLocationEntity[]): IAuthRefreshTokenLocationDTO[] {
        return params.map((param: IAuthRefreshTokenLocationEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLocationDTO): IAuthRefreshTokenLocationEntity {
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

    public mapToList(params: IAuthRefreshTokenLocationDTO[]): IAuthRefreshTokenLocationEntity[] {
        return params.map((param: IAuthRefreshTokenLocationDTO) => {
            return this.mapTo(param);
        })
    }
}