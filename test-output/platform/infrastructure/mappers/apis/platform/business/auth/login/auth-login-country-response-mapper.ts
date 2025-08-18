import { Mapper } from "@bus/core/classes";
import { IAuthLoginCountryResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginCountryResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginCountryResponseMapper extends Mapper<IAuthLoginCountryResponseEntity, IAuthLoginCountryResponseDTO> {

    private static instance: AuthLoginCountryResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCountryResponseMapper {
        if (!AuthLoginCountryResponseMapper.instance)
            AuthLoginCountryResponseMapper.instance = new AuthLoginCountryResponseMapper();
        return AuthLoginCountryResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginCountryResponseEntity): IAuthLoginCountryResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCountryResponseEntity[]): IAuthLoginCountryResponseDTO[] {
        return params.map((param: IAuthLoginCountryResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCountryResponseDTO): IAuthLoginCountryResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCountryResponseDTO[]): IAuthLoginCountryResponseEntity[] {
        return params.map((param: IAuthLoginCountryResponseDTO) => {
            return this.mapTo(param);
        })
    }
}