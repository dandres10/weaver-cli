import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenLocationLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenLocationLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class AuthRefreshTokenLocationLoginResponseMapper extends Mapper<IAuthRefreshTokenLocationLoginResponseEntity, IAuthRefreshTokenLocationLoginResponseDTO> {

    private static instance: AuthRefreshTokenLocationLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenLocationLoginResponseMapper {
        if (!AuthRefreshTokenLocationLoginResponseMapper.instance)
            AuthRefreshTokenLocationLoginResponseMapper.instance = new AuthRefreshTokenLocationLoginResponseMapper();
        return AuthRefreshTokenLocationLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenLocationLoginResponseEntity): IAuthRefreshTokenLocationLoginResponseDTO {
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

    public mapFromList(params: IAuthRefreshTokenLocationLoginResponseEntity[]): IAuthRefreshTokenLocationLoginResponseDTO[] {
        return params.map((param: IAuthRefreshTokenLocationLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenLocationLoginResponseDTO): IAuthRefreshTokenLocationLoginResponseEntity {
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

    public mapToList(params: IAuthRefreshTokenLocationLoginResponseDTO[]): IAuthRefreshTokenLocationLoginResponseEntity[] {
        return params.map((param: IAuthRefreshTokenLocationLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}