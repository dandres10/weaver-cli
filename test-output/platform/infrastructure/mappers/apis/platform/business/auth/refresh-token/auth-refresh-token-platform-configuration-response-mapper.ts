import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformConfigurationResponseMapper extends Mapper<IAuthRefreshTokenPlatformConfigurationResponseEntity, IAuthRefreshTokenPlatformConfigurationResponseDTO> {

    private static instance: AuthRefreshTokenPlatformConfigurationResponseMapper;
    private userresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.UserResponseMapper()
    private currencyresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyResponseMapper()
    private locationresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationResponseMapper()
    private languageresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageResponseMapper()
    private platformresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PlatformResponseMapper()
    private countryresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CountryResponseMapper()
    private companyresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyResponseMapper()
    private rolresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.RolResponseMapper()
    private permissionresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PermissionResponseMapper()
    private menuresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.MenuResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformConfigurationResponseMapper {
        if (!AuthRefreshTokenPlatformConfigurationResponseMapper.instance)
            AuthRefreshTokenPlatformConfigurationResponseMapper.instance = new AuthRefreshTokenPlatformConfigurationResponseMapper();
        return AuthRefreshTokenPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformConfigurationResponseEntity): IAuthRefreshTokenPlatformConfigurationResponseDTO {
        return {
            user: this.userresponseMapper.mapFrom(param.user),
            currency: this.currencyresponseMapper.mapFrom(param.currency),
            location: this.locationresponseMapper.mapFrom(param.location),
            language: this.languageresponseMapper.mapFrom(param.language),
            platform: this.platformresponseMapper.mapFrom(param.platform),
            country: this.countryresponseMapper.mapFrom(param.country),
            company: this.companyresponseMapper.mapFrom(param.company),
            rol: this.rolresponseMapper.mapFrom(param.rol),
            permissions: this.permissionresponseMapper.mapFromList(param.permissions),
            menu: this.menuresponseMapper.mapFromList(param.menu)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformConfigurationResponseEntity[]): IAuthRefreshTokenPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformConfigurationResponseDTO): IAuthRefreshTokenPlatformConfigurationResponseEntity {
        return {
            user: this.userresponseMapper.mapTo(param.user),
            currency: this.currencyresponseMapper.mapTo(param.currency),
            location: this.locationresponseMapper.mapTo(param.location),
            language: this.languageresponseMapper.mapTo(param.language),
            platform: this.platformresponseMapper.mapTo(param.platform),
            country: this.countryresponseMapper.mapTo(param.country),
            company: this.companyresponseMapper.mapTo(param.company),
            rol: this.rolresponseMapper.mapTo(param.rol),
            permissions: this.permissionresponseMapper.mapToList(param.permissions),
            menu: this.menuresponseMapper.mapToList(param.menu)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformConfigurationResponseDTO[]): IAuthRefreshTokenPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}