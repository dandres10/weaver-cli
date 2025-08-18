import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformConfigurationResponseMapper extends Mapper<IAuthLoginPlatformConfigurationResponseEntity, IAuthLoginPlatformConfigurationResponseDTO> {

    private static instance: AuthLoginPlatformConfigurationResponseMapper;
    private userloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserLoginResponseMapper()
    private currencyloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyLoginResponseMapper()
    private locationloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationLoginResponseMapper()
    private languageloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageLoginResponseMapper()
    private platformloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PlatformLoginResponseMapper()
    private countryloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CountryLoginResponseMapper()
    private companyloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyLoginResponseMapper()
    private rolloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.RolLoginResponseMapper()
    private permissionloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PermissionLoginResponseMapper()
    private menuloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.MenuLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformConfigurationResponseMapper {
        if (!AuthLoginPlatformConfigurationResponseMapper.instance)
            AuthLoginPlatformConfigurationResponseMapper.instance = new AuthLoginPlatformConfigurationResponseMapper();
        return AuthLoginPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformConfigurationResponseEntity): IAuthLoginPlatformConfigurationResponseDTO {
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

    public mapFromList(params: IAuthLoginPlatformConfigurationResponseEntity[]): IAuthLoginPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformConfigurationResponseDTO): IAuthLoginPlatformConfigurationResponseEntity {
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

    public mapToList(params: IAuthLoginPlatformConfigurationResponseDTO[]): IAuthLoginPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}