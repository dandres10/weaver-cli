import { Mapper } from "@bus/core/classes";
import { IAuthLoginPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthLoginPlatformVariationsResponseMapper extends Mapper<IAuthLoginPlatformVariationsResponseEntity, IAuthLoginPlatformVariationsResponseDTO> {

    private static instance: AuthLoginPlatformVariationsResponseMapper;
    private currencyresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyResponseMapper()
    private locationresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationResponseMapper()
    private languageresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageResponseMapper()
    private companyresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthLoginPlatformVariationsResponseMapper {
        if (!AuthLoginPlatformVariationsResponseMapper.instance)
            AuthLoginPlatformVariationsResponseMapper.instance = new AuthLoginPlatformVariationsResponseMapper();
        return AuthLoginPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginPlatformVariationsResponseEntity): IAuthLoginPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyresponseMapper.mapFromList(param.currencies),
            locations: this.locationresponseMapper.mapFromList(param.locations),
            languages: this.languageresponseMapper.mapFromList(param.languages),
            companies: this.companyresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthLoginPlatformVariationsResponseEntity[]): IAuthLoginPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginPlatformVariationsResponseDTO): IAuthLoginPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyresponseMapper.mapToList(param.currencies),
            locations: this.locationresponseMapper.mapToList(param.locations),
            languages: this.languageresponseMapper.mapToList(param.languages),
            companies: this.companyresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthLoginPlatformVariationsResponseDTO[]): IAuthLoginPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthLoginPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}