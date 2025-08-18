import { Mapper } from "@bus/core/classes";
import { IAuthLoginCountryDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginCountryEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class AuthLoginCountryMapper extends Mapper<IAuthLoginCountryEntity, IAuthLoginCountryDTO> {

    private static instance: AuthLoginCountryMapper;

    public constructor() { super(); }

    public static getInstance(): AuthLoginCountryMapper {
        if (!AuthLoginCountryMapper.instance)
            AuthLoginCountryMapper.instance = new AuthLoginCountryMapper();
        return AuthLoginCountryMapper.instance;
    }

    public mapFrom(param: IAuthLoginCountryEntity): IAuthLoginCountryDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    public mapFromList(params: IAuthLoginCountryEntity[]): IAuthLoginCountryDTO[] {
        return params.map((param: IAuthLoginCountryEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginCountryDTO): IAuthLoginCountryEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    public mapToList(params: IAuthLoginCountryDTO[]): IAuthLoginCountryEntity[] {
        return params.map((param: IAuthLoginCountryDTO) => {
            return this.mapTo(param);
        })
    }
}