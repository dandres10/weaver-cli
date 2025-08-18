import { Mapper } from "@bus/core/classes";
import { IPlatformVariationsResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IPlatformVariationsResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class PlatformVariationsResponseMapper extends Mapper<IPlatformVariationsResponseEntity, IPlatformVariationsResponseDTO> {

    private static instance: PlatformVariationsResponseMapper;
    private currencyloginresponseresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CurrencyLoginResponseMapper()
    private locationloginresponseresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LocationLoginResponseMapper()
    private languageloginresponseresponseMapper = InjectionPlatformBusinessAuthLoginMapper.LanguageLoginResponseMapper()
    private companyloginresponseresponseMapper = InjectionPlatformBusinessAuthLoginMapper.CompanyLoginResponseMapper()
    public constructor() { super(); }

    public static getInstance(): PlatformVariationsResponseMapper {
        if (!PlatformVariationsResponseMapper.instance)
            PlatformVariationsResponseMapper.instance = new PlatformVariationsResponseMapper();
        return PlatformVariationsResponseMapper.instance;
    }

    public mapFrom(param: IPlatformVariationsResponseEntity): IPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyloginresponseresponseMapper.mapFromList(param.currencies),
            locations: this.locationloginresponseresponseMapper.mapFromList(param.locations),
            languages: this.languageloginresponseresponseMapper.mapFromList(param.languages),
            companies: this.companyloginresponseresponseMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IPlatformVariationsResponseEntity[]): IPlatformVariationsResponseDTO[] {
        return params.map((param: IPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPlatformVariationsResponseDTO): IPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyloginresponseMapper.mapToList(param.currencies),
            locations: this.locationloginresponseMapper.mapToList(param.locations),
            languages: this.languageloginresponseMapper.mapToList(param.languages),
            companies: this.companyloginresponseMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IPlatformVariationsResponseDTO[]): IPlatformVariationsResponseEntity[] {
        return params.map((param: IPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }
}