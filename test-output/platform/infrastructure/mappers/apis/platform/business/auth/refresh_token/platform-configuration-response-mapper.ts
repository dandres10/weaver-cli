import { Mapper } from "@bus/core/classes";
import { IPlatformConfigurationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh_token";
import { IPlatformConfigurationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh_token";
import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";

export class PlatformConfigurationResponseMapper extends Mapper<IPlatformConfigurationResponseEntity, IPlatformConfigurationResponseDTO> {

    private static instance: PlatformConfigurationResponseMapper;
    private userloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.UserLoginResponseMapper()
    private currencyloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.CurrencyLoginResponseMapper()
    private locationloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.LocationLoginResponseMapper()
    private languageloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.LanguageLoginResponseMapper()
    private platformloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.PlatformLoginResponseMapper()
    private countryloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.CountryLoginResponseMapper()
    private companyloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.CompanyLoginResponseMapper()
    private rolloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.RolLoginResponseMapper()
    private permissionloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.PermissionLoginResponseMapper()
    private menuloginresponseresponseMapper = InjectionPlatformBusinessAuthMapper.MenuLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): PlatformConfigurationResponseMapper {
        if (!PlatformConfigurationResponseMapper.instance)
            PlatformConfigurationResponseMapper.instance = new PlatformConfigurationResponseMapper();
        return PlatformConfigurationResponseMapper.instance;
    }

    public mapFrom(param: IPlatformConfigurationResponseEntity): IPlatformConfigurationResponseDTO {
        return {
            user: this.userloginresponseresponseMapper.mapFrom(param.user),
            currency: this.currencyloginresponseresponseMapper.mapFrom(param.currency),
            location: this.locationloginresponseresponseMapper.mapFrom(param.location),
            language: this.languageloginresponseresponseMapper.mapFrom(param.language),
            platform: this.platformloginresponseresponseMapper.mapFrom(param.platform),
            country: this.countryloginresponseresponseMapper.mapFrom(param.country),
            company: this.companyloginresponseresponseMapper.mapFrom(param.company),
            rol: this.rolloginresponseresponseMapper.mapFrom(param.rol),
            permissions: this.permissionloginresponseresponseMapper.mapFromList(param.permissions),
            menu: this.menuloginresponseresponseMapper.mapFromList(param.menu)
        }
    }

    public mapFromList(params: IPlatformConfigurationResponseEntity[]): IPlatformConfigurationResponseDTO[] {
        return params.map((param: IPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPlatformConfigurationResponseDTO): IPlatformConfigurationResponseEntity {
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

    public mapToList(params: IPlatformConfigurationResponseDTO[]): IPlatformConfigurationResponseEntity[] {
        return params.map((param: IPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}