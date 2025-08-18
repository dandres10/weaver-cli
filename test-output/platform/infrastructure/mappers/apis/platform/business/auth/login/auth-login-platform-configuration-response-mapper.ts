import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformConfigurationResponseMapper extends Mapper<IAuthLoginPlatformConfigurationResponseEntity, IAuthLoginPlatformConfigurationResponseDTO> {

    private static instance: AuthLoginPlatformConfigurationResponseMapper;
    private userLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserLoginResponseMapper()
    private currencyLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyLoginResponseMapper()
    private locationLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationLoginResponseMapper()
    private languageLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageLoginResponseMapper()
    private platformLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PlatformLoginResponseMapper()
    private countryLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CountryLoginResponseMapper()
    private companyLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyLoginResponseMapper()
    private rolLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.RolLoginResponseMapper()
    private permissionLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PermissionLoginResponseMapper()
    private menuLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.MenuLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformConfigurationResponseMapper {
        if (!AuthLoginPlatformConfigurationResponseMapper.instance)
            AuthLoginPlatformConfigurationResponseMapper.instance = new AuthLoginPlatformConfigurationResponseMapper();
        return AuthLoginPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformConfigurationResponseEntity): IAuthLoginPlatformConfigurationResponseDTO {
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

    public mapFromList(params: IAuthLoginPlatformConfigurationResponseEntity[]): IAuthLoginPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformConfigurationResponseDTO): IAuthLoginPlatformConfigurationResponseEntity {
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

    public mapToList(params: IAuthLoginPlatformConfigurationResponseDTO[]): IAuthLoginPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}