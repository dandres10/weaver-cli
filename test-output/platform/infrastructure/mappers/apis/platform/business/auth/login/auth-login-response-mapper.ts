import { Mapper } from "@bus/core/classes";
import { IAuthLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginResponseMapper extends Mapper<IAuthLoginResponseEntity, IAuthLoginResponseDTO> {

    private static instance: AuthLoginResponseMapper;
    private platformconfigurationMapper = InjectionPlatformBusinessAuthLoginMapper.PlatformConfigurationResponseMapper()
    private platformvariationsMapper = InjectionPlatformBusinessAuthLoginMapper.PlatformVariationsResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginResponseMapper {
        if (!AuthLoginResponseMapper.instance)
            AuthLoginResponseMapper.instance = new AuthLoginResponseMapper();
        return AuthLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginResponseEntity): IAuthLoginResponseDTO {
        return {
            platformConfiguration: this.platformconfigurationMapper.mapFrom(param.platform_configuration),
            platformVariations: this.platformvariationsMapper.mapFrom(param.platform_variations),
            token: param.token
        }
    }

    public mapFromList(params: IAuthLoginResponseEntity[]): IAuthLoginResponseDTO[] {
        return params.map((param: IAuthLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginResponseDTO): IAuthLoginResponseEntity {
        return {
            platform_configuration: this.platformconfigurationMapper.mapTo(param.platformConfiguration),
            platform_variations: this.platformvariationsMapper.mapTo(param.platformVariations),
            token: param.token
        }
    }

    public mapToList(params: IAuthLoginResponseDTO[]): IAuthLoginResponseEntity[] {
        return params.map((param: IAuthLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}