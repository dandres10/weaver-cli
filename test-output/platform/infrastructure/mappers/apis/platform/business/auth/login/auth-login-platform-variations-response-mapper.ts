import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IAuthLoginPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformVariationsResponseMapper extends Mapper<IAuthLoginPlatformVariationsResponseEntity, IAuthLoginPlatformVariationsResponseDTO> {

    private static instance: AuthLoginPlatformVariationsResponseMapper;
    private currencyLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyLoginResponseMapper()
    private locationLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationLoginResponseMapper()
    private languageLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageLoginResponseMapper()
    private companyLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformVariationsResponseMapper {
        if (!AuthLoginPlatformVariationsResponseMapper.instance)
            AuthLoginPlatformVariationsResponseMapper.instance = new AuthLoginPlatformVariationsResponseMapper();
        return AuthLoginPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformVariationsResponseEntity): IAuthLoginPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyLoginresponseMapper.mapFromList(param.currencies),
            locations: this.locationLoginresponseMapper.mapFromList(param.locations),
            languages: this.languageLoginresponseMapper.mapFromList(param.languages),
            companies: this.companyLoginresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthLoginPlatformVariationsResponseEntity[]): IAuthLoginPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformVariationsResponseDTO): IAuthLoginPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyLoginresponseMapper.mapToList(param.currencies),
            locations: this.locationLoginresponseMapper.mapToList(param.locations),
            languages: this.languageLoginresponseMapper.mapToList(param.languages),
            companies: this.companyLoginresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthLoginPlatformVariationsResponseDTO[]): IAuthLoginPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}