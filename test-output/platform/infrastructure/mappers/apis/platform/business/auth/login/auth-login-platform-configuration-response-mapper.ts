import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformConfigurationResponseMapper extends Mapper<IAuthLoginPlatformConfigurationResponseEntity, IAuthLoginPlatformConfigurationResponseDTO> {

    private static instance: AuthLoginPlatformConfigurationResponseMapper;
    private userresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserResponseMapper()
    private currencyresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyResponseMapper()
    private locationresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationResponseMapper()
    private languageresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageResponseMapper()
    private platformresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PlatformResponseMapper()
    private countryresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CountryResponseMapper()
    private companyresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyResponseMapper()
    private rolresponseMapper = InjectionPlatformBusinessAuthLoginMapper.RolResponseMapper()
    private permissionresponseMapper = InjectionPlatformBusinessAuthLoginMapper.PermissionResponseMapper()
    private menuresponseMapper = InjectionPlatformBusinessAuthLoginMapper.MenuResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformConfigurationResponseMapper {
        if (!AuthLoginPlatformConfigurationResponseMapper.instance)
            AuthLoginPlatformConfigurationResponseMapper.instance = new AuthLoginPlatformConfigurationResponseMapper();
        return AuthLoginPlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformConfigurationResponseEntity): IAuthLoginPlatformConfigurationResponseDTO {
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

    public mapFromList(params: IAuthLoginPlatformConfigurationResponseEntity[]): IAuthLoginPlatformConfigurationResponseDTO[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformConfigurationResponseDTO): IAuthLoginPlatformConfigurationResponseEntity {
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

    public mapToList(params: IAuthLoginPlatformConfigurationResponseDTO[]): IAuthLoginPlatformConfigurationResponseEntity[] {
        return params.map((param: IAuthLoginPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}