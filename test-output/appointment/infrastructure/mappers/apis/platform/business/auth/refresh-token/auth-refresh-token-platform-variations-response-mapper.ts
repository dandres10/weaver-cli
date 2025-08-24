import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformVariationsResponseMapper extends Mapper<IAuthRefreshTokenPlatformVariationsResponseEntity, IAuthRefreshTokenPlatformVariationsResponseDTO> {

    private static instance: AuthRefreshTokenPlatformVariationsResponseMapper;
    private currencyresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyResponseMapper()
    private locationresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationResponseMapper()
    private languageresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageResponseMapper()
    private companyresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformVariationsResponseMapper {
        if (!AuthRefreshTokenPlatformVariationsResponseMapper.instance)
            AuthRefreshTokenPlatformVariationsResponseMapper.instance = new AuthRefreshTokenPlatformVariationsResponseMapper();
        return AuthRefreshTokenPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformVariationsResponseEntity): IAuthRefreshTokenPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyresponseMapper.mapFromList(param.currencies),
            locations: this.locationresponseMapper.mapFromList(param.locations),
            languages: this.languageresponseMapper.mapFromList(param.languages),
            companies: this.companyresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformVariationsResponseEntity[]): IAuthRefreshTokenPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformVariationsResponseDTO): IAuthRefreshTokenPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyresponseMapper.mapToList(param.currencies),
            locations: this.locationresponseMapper.mapToList(param.locations),
            languages: this.languageresponseMapper.mapToList(param.languages),
            companies: this.companyresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformVariationsResponseDTO[]): IAuthRefreshTokenPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}