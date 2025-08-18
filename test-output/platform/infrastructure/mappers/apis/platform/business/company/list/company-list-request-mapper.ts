import { Mapper } from "@bus/core/classes";
import { ICompanyListRequestDTO } from "@platform/domain/models/apis/platform/business/company";
import { CompanyListRequestEntity } from "@platform/infrastructure/entities/apis/platform/business/company";
import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";

export class CompanyListRequestMapper extends Mapper<CompanyListRequestEntity, ICompanyListRequestDTO> {

    private static instance: CompanyListRequestMapper;
    private any[]ResponseMapper = InjectionPlatformBusinessAuthMapper.Any[]ResponseMapper()
    public constructor() { super(); }

    public static getInstance(): CompanyListRequestMapper {
        if (!CompanyListRequestMapper.instance)
            CompanyListRequestMapper.instance = new CompanyListRequestMapper();
        return CompanyListRequestMapper.instance;
    }

    public mapFrom(param: CompanyListRequestEntity): ICompanyListRequestDTO {
        return {
            skip: param.skip,
            limit: param.limit,
            allData: param.all_data,
            filters: this.any[]ResponseMapper.mapFrom(param.filters)
        }
    }

    public mapFromList(params: CompanyListRequestEntity[]): ICompanyListRequestDTO[] {
        return params.map((param: CompanyListRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompanyListRequestDTO): CompanyListRequestEntity {
        return {
            skip: param.skip,
            limit: param.limit,
            all_data: param.allData,
            filters: this.any[]ResponseMapper.mapTo(param.filters)
        }
    }

    public mapToList(params: ICompanyListRequestDTO[]): CompanyListRequestEntity[] {
        return params.map((param: ICompanyListRequestDTO) => {
            return this.mapTo(param);
        })
    }
}