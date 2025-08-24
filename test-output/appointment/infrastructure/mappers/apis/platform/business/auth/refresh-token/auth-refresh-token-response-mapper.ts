import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenResponseMapper extends Mapper<IAuthRefreshTokenResponseEntity, IAuthRefreshTokenResponseDTO> {

    private static instance: AuthRefreshTokenResponseMapper;
    private platformConfigurationresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PlatformConfigurationResponseMapper()
    private platformVariationsresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PlatformVariationsResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenResponseMapper {
        if (!AuthRefreshTokenResponseMapper.instance)
            AuthRefreshTokenResponseMapper.instance = new AuthRefreshTokenResponseMapper();
        return AuthRefreshTokenResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenResponseEntity): IAuthRefreshTokenResponseDTO {
        return {
            platformConfiguration: this.platformConfigurationresponseMapper.mapFrom(param.platform_configuration),
            platformVariations: this.platformVariationsresponseMapper.mapFrom(param.platform_variations),
            token: param.token
        }
    }

    public mapFromList(params: IAuthRefreshTokenResponseEntity[]): IAuthRefreshTokenResponseDTO[] {
        return params.map((param: IAuthRefreshTokenResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenResponseDTO): IAuthRefreshTokenResponseEntity {
        return {
            platform_configuration: this.platformConfigurationresponseMapper.mapTo(param.platformConfiguration),
            platform_variations: this.platformVariationsresponseMapper.mapTo(param.platformVariations),
            token: param.token
        }
    }

    public mapToList(params: IAuthRefreshTokenResponseDTO[]): IAuthRefreshTokenResponseEntity[] {
        return params.map((param: IAuthRefreshTokenResponseDTO) => {
            return this.mapTo(param);
        })
    }
}