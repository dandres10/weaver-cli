import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformConfigurationResponseMapper extends Mapper<IAuthRefreshTokenPlatformConfigurationResponseEntity, IAuthRefreshTokenPlatformConfigurationResponseDTO> {

    private static instance: AuthRefreshTokenPlatformConfigurationResponseMapper;
    private userloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.UserLoginResponseMapper()
    private currencyloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyLoginResponseMapper()
    private locationloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationLoginResponseMapper()
    private languageloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageLoginResponseMapper()
    private platformloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PlatformLoginResponseMapper()
    private countryloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CountryLoginResponseMapper()
    private companyloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyLoginResponseMapper()
    private rolloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.RolLoginResponseMapper()
    private permissionloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.PermissionLoginResponseMapper()
    private menuloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.MenuLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformConfigurationResponseMapper {
        if (!AuthRefreshTokenPlatformConfigurationResponseMapper.instance)
            AuthRefreshTokenPlatformConfigurationResponseMapper.instance = new AuthRefreshTokenPlatformConfigurationResponseMapper();
        return AuthRefreshTokenPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformConfigurationResponseEntity): IAuthRefreshTokenPlatformConfigurationResponseDTO {
        return {
            user: this.userloginresponseMapper.mapFrom(param.user),
            currency: this.currencyloginresponseMapper.mapFrom(param.currency),
            location: this.locationloginresponseMapper.mapFrom(param.location),
            language: this.languageloginresponseMapper.mapFrom(param.language),
            platform: this.platformloginresponseMapper.mapFrom(param.platform),
            country: this.countryloginresponseMapper.mapFrom(param.country),
            company: this.companyloginresponseMapper.mapFrom(param.company),
            rol: this.rolloginresponseMapper.mapFrom(param.rol),
            permissions: this.permissionloginresponseMapper.mapFromList(param.permissions),
            menu: this.menuloginresponseMapper.mapFromList(param.menu)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformConfigurationResponseEntity[]): IAuthRefreshTokenPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformConfigurationResponseDTO): IAuthRefreshTokenPlatformConfigurationResponseEntity {
        return {
            user: this.userloginresponseMapper.mapTo(param.user),
            currency: this.currencyloginresponseMapper.mapTo(param.currency),
            location: this.locationloginresponseMapper.mapTo(param.location),
            language: this.languageloginresponseMapper.mapTo(param.language),
            platform: this.platformloginresponseMapper.mapTo(param.platform),
            country: this.countryloginresponseMapper.mapTo(param.country),
            company: this.companyloginresponseMapper.mapTo(param.company),
            rol: this.rolloginresponseMapper.mapTo(param.rol),
            permissions: this.permissionloginresponseMapper.mapToList(param.permissions),
            menu: this.menuloginresponseMapper.mapToList(param.menu)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformConfigurationResponseDTO[]): IAuthRefreshTokenPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}