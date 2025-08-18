import { Mapper } from "@bus/core/classes";
import { IAuthLoginLocationResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginLocationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginLocationResponseMapper extends Mapper<IAuthLoginLocationResponseEntity, IAuthLoginLocationResponseDTO> {

    private static instance: AuthLoginLocationResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginLocationResponseMapper {
        if (!AuthLoginLocationResponseMapper.instance)
            AuthLoginLocationResponseMapper.instance = new AuthLoginLocationResponseMapper();
        return AuthLoginLocationResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginLocationResponseEntity): IAuthLoginLocationResponseDTO {
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

    public mapFromList(params: IAuthLoginLocationResponseEntity[]): IAuthLoginLocationResponseDTO[] {
        return params.map((param: IAuthLoginLocationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginLocationResponseDTO): IAuthLoginLocationResponseEntity {
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

    public mapToList(params: IAuthLoginLocationResponseDTO[]): IAuthLoginLocationResponseEntity[] {
        return params.map((param: IAuthLoginLocationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}