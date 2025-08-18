import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthRefreshTokenPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformVariationsResponseMapper extends Mapper<IAuthRefreshTokenPlatformVariationsResponseEntity, IAuthRefreshTokenPlatformVariationsResponseDTO> {

    private static instance: AuthRefreshTokenPlatformVariationsResponseMapper;
    private currencyLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyLoginResponseMapper()
    private locationLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationLoginResponseMapper()
    private languageLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageLoginResponseMapper()
    private companyLoginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformVariationsResponseMapper {
        if (!AuthRefreshTokenPlatformVariationsResponseMapper.instance)
            AuthRefreshTokenPlatformVariationsResponseMapper.instance = new AuthRefreshTokenPlatformVariationsResponseMapper();
        return AuthRefreshTokenPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformVariationsResponseEntity): IAuthRefreshTokenPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyLoginresponseMapper.mapFromList(param.currencies),
            locations: this.locationLoginresponseMapper.mapFromList(param.locations),
            languages: this.languageLoginresponseMapper.mapFromList(param.languages),
            companies: this.companyLoginresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformVariationsResponseEntity[]): IAuthRefreshTokenPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformVariationsResponseDTO): IAuthRefreshTokenPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyLoginresponseMapper.mapToList(param.currencies),
            locations: this.locationLoginresponseMapper.mapToList(param.locations),
            languages: this.languageLoginresponseMapper.mapToList(param.languages),
            companies: this.companyLoginresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformVariationsResponseDTO[]): IAuthRefreshTokenPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}