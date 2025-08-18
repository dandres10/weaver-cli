import { Mapper } from "@bus/core/classes";
import { IAuthLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";

export class AuthLoginResponseMapper extends Mapper<IAuthLoginResponseEntity, IAuthLoginResponseDTO> {

    private static instance: AuthLoginResponseMapper;
    private platformconfigurationResponseMapper = InjectionPlatformBusinessAuthMapper.PlatformConfigurationResponseMapper()
    private platformvariationsResponseMapper = InjectionPlatformBusinessAuthMapper.PlatformVariationsResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginResponseMapper {
        if (!AuthLoginResponseMapper.instance)
            AuthLoginResponseMapper.instance = new AuthLoginResponseMapper();
        return AuthLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginResponseEntity): IAuthLoginResponseDTO {
        return {
            platformConfiguration: this.platformconfigurationResponseMapper.mapFrom(param.platform_configuration),
            platformVariations: this.platformvariationsResponseMapper.mapFrom(param.platform_variations),
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
            platform_configuration: this.platformconfigurationResponseMapper.mapTo(param.platformConfiguration),
            platform_variations: this.platformvariationsResponseMapper.mapTo(param.platformVariations),
            token: param.token
        }
    }

    public mapToList(params: IAuthLoginResponseDTO[]): IAuthLoginResponseEntity[] {
        return params.map((param: IAuthLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}