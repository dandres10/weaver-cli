import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLocationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLocationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLocationResponseMapper extends Mapper<IAuthRefreshTokenLocationResponseEntity, IAuthRefreshTokenLocationResponseDTO> {

    private static instance: AuthRefreshTokenLocationResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLocationResponseMapper {
        if (!AuthRefreshTokenLocationResponseMapper.instance)
            AuthRefreshTokenLocationResponseMapper.instance = new AuthRefreshTokenLocationResponseMapper();
        return AuthRefreshTokenLocationResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLocationResponseEntity): IAuthRefreshTokenLocationResponseDTO {
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

    public mapFromList(params: IAuthRefreshTokenLocationResponseEntity[]): IAuthRefreshTokenLocationResponseDTO[] {
        return params.map((param: IAuthRefreshTokenLocationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLocationResponseDTO): IAuthRefreshTokenLocationResponseEntity {
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

    public mapToList(params: IAuthRefreshTokenLocationResponseDTO[]): IAuthRefreshTokenLocationResponseEntity[] {
        return params.map((param: IAuthRefreshTokenLocationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}