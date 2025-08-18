import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformConfigurationResponseMapper extends Mapper<IAuthRefreshTokenPlatformConfigurationResponseEntity, IAuthRefreshTokenPlatformConfigurationResponseDTO> {

    private static instance: AuthRefreshTokenPlatformConfigurationResponseMapper;
    private userLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.UserLoginResponseMapper()
    private currencyLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyLoginResponseMapper()
    private locationLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationLoginResponseMapper()
    private languageLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageLoginResponseMapper()
    private platformLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PlatformLoginResponseMapper()
    private countryLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CountryLoginResponseMapper()
    private companyLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyLoginResponseMapper()
    private rolLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.RolLoginResponseMapper()
    private permissionLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PermissionLoginResponseMapper()
    private menuLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.MenuLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformConfigurationResponseMapper {
        if (!AuthRefreshTokenPlatformConfigurationResponseMapper.instance)
            AuthRefreshTokenPlatformConfigurationResponseMapper.instance = new AuthRefreshTokenPlatformConfigurationResponseMapper();
        return AuthRefreshTokenPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformConfigurationResponseEntity): IAuthRefreshTokenPlatformConfigurationResponseDTO {
        return {
            user: this.userLoginresponseMapper.mapFrom(param.user),
            currency: this.currencyLoginresponseMapper.mapFrom(param.currency),
            location: this.locationLoginresponseMapper.mapFrom(param.location),
            language: this.languageLoginresponseMapper.mapFrom(param.language),
            platform: this.platformLoginresponseMapper.mapFrom(param.platform),
            country: this.countryLoginresponseMapper.mapFrom(param.country),
            company: this.companyLoginresponseMapper.mapFrom(param.company),
            rol: this.rolLoginresponseMapper.mapFrom(param.rol),
            permissions: this.permissionLoginresponseMapper.mapFromList(param.permissions),
            menu: this.menuLoginresponseMapper.mapFromList(param.menu)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformConfigurationResponseEntity[]): IAuthRefreshTokenPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformConfigurationResponseDTO): IAuthRefreshTokenPlatformConfigurationResponseEntity {
        return {
            user: this.userLoginresponseMapper.mapTo(param.user),
            currency: this.currencyLoginresponseMapper.mapTo(param.currency),
            location: this.locationLoginresponseMapper.mapTo(param.location),
            language: this.languageLoginresponseMapper.mapTo(param.language),
            platform: this.platformLoginresponseMapper.mapTo(param.platform),
            country: this.countryLoginresponseMapper.mapTo(param.country),
            company: this.companyLoginresponseMapper.mapTo(param.company),
            rol: this.rolLoginresponseMapper.mapTo(param.rol),
            permissions: this.permissionLoginresponseMapper.mapToList(param.permissions),
            menu: this.menuLoginresponseMapper.mapToList(param.menu)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformConfigurationResponseDTO[]): IAuthRefreshTokenPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}