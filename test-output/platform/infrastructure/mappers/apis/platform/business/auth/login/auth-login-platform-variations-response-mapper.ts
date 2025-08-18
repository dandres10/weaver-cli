import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformVariationsResponseMapper extends Mapper<IAuthLoginPlatformVariationsResponseEntity, IAuthLoginPlatformVariationsResponseDTO> {

    private static instance: AuthLoginPlatformVariationsResponseMapper;
    private currencyloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyLoginResponseMapper()
    private locationloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationLoginResponseMapper()
    private languageloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageLoginResponseMapper()
    private companyloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformVariationsResponseMapper {
        if (!AuthLoginPlatformVariationsResponseMapper.instance)
            AuthLoginPlatformVariationsResponseMapper.instance = new AuthLoginPlatformVariationsResponseMapper();
        return AuthLoginPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformVariationsResponseEntity): IAuthLoginPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyloginresponseMapper.mapFromList(param.currencies),
            locations: this.locationloginresponseMapper.mapFromList(param.locations),
            languages: this.languageloginresponseMapper.mapFromList(param.languages),
            companies: this.companyloginresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthLoginPlatformVariationsResponseEntity[]): IAuthLoginPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformVariationsResponseDTO): IAuthLoginPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyloginresponseMapper.mapToList(param.currencies),
            locations: this.locationloginresponseMapper.mapToList(param.locations),
            languages: this.languageloginresponseMapper.mapToList(param.languages),
            companies: this.companyloginresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthLoginPlatformVariationsResponseDTO[]): IAuthLoginPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}