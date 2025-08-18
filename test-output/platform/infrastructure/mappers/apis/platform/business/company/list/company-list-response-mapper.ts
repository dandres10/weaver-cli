import { Mapper } from "@bus/core/classes";
import { ICompanyListResponseDTO } from "@platform/domain/models/apis/platform/business/company";
import { CompanyListResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/company";

export class CompanyListResponseMapper extends Mapper<CompanyListResponseEntity, ICompanyListResponseDTO> {

    private static instance: CompanyListResponseMapper;

    public constructor() { super(); }

    public static getInstance(): CompanyListResponseMapper {
        if (!CompanyListResponseMapper.instance)
            CompanyListResponseMapper.instance = new CompanyListResponseMapper();
        return CompanyListResponseMapper.instance;
    }

    public mapFrom(param: CompanyListResponseEntity): ICompanyListResponseDTO {
        return {
            data: param.data
        }
    }

    public mapFromList(params: CompanyListResponseEntity[]): ICompanyListResponseDTO[] {
        return params.map((param: CompanyListResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompanyListResponseDTO): CompanyListResponseEntity {
        return {
            data: param.data
        }
    }

    public mapToList(params: ICompanyListResponseDTO[]): CompanyListResponseEntity[] {
        return params.map((param: ICompanyListResponseDTO) => {
            return this.mapTo(param);
        })
    }
}