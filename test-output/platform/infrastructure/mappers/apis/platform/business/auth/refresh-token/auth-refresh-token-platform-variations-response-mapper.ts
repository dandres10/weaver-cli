import { Mapper } from "@bus/core/classes";
import { IAuthRefreshTokenPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRefreshTokenPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";

export class AuthRefreshTokenPlatformVariationsResponseMapper extends Mapper<IAuthRefreshTokenPlatformVariationsResponseEntity, IAuthRefreshTokenPlatformVariationsResponseDTO> {

    private static instance: AuthRefreshTokenPlatformVariationsResponseMapper;
    private currencyloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CurrencyLoginResponseMapper()
    private locationloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LocationLoginResponseMapper()
    private languageloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.LanguageLoginResponseMapper()
    private companyloginresponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.CompanyLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AuthRefreshTokenPlatformVariationsResponseMapper {
        if (!AuthRefreshTokenPlatformVariationsResponseMapper.instance)
            AuthRefreshTokenPlatformVariationsResponseMapper.instance = new AuthRefreshTokenPlatformVariationsResponseMapper();
        return AuthRefreshTokenPlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IAuthRefreshTokenPlatformVariationsResponseEntity): IAuthRefreshTokenPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyloginresponseMapper.mapFromList(param.currencies),
            locations: this.locationloginresponseMapper.mapFromList(param.locations),
            languages: this.languageloginresponseMapper.mapFromList(param.languages),
            companies: this.companyloginresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IAuthRefreshTokenPlatformVariationsResponseEntity[]): IAuthRefreshTokenPlatformVariationsResponseDTO[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthRefreshTokenPlatformVariationsResponseDTO): IAuthRefreshTokenPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyloginresponseMapper.mapToList(param.currencies),
            locations: this.locationloginresponseMapper.mapToList(param.locations),
            languages: this.languageloginresponseMapper.mapToList(param.languages),
            companies: this.companyloginresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IAuthRefreshTokenPlatformVariationsResponseDTO[]): IAuthRefreshTokenPlatformVariationsResponseEntity[] {
        return params.map((param: IAuthRefreshTokenPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}