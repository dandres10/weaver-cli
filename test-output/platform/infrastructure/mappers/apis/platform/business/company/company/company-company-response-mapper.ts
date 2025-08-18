import { Mapper } from "@bus/core/classes";
import { ICompanyCompanyResponseDTO } from "@platform/domain/models/apis/platform/business/company";
import { CompanyCompanyResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/company";

export class CompanyCompanyResponseMapper extends Mapper<CompanyCompanyResponseEntity, ICompanyCompanyResponseDTO> {

    private static instance: CompanyCompanyResponseMapper;

    public constructor() { super(); }

    public static getInstance(): CompanyCompanyResponseMapper {
        if (!CompanyCompanyResponseMapper.instance)
            CompanyCompanyResponseMapper.instance = new CompanyCompanyResponseMapper();
        return CompanyCompanyResponseMapper.instance;
    }

    public mapFrom(param: CompanyCompanyResponseEntity): ICompanyCompanyResponseDTO {
        return {
            data: param.data
        }
    }

    public mapFromList(params: CompanyCompanyResponseEntity[]): ICompanyCompanyResponseDTO[] {
        return params.map((param: CompanyCompanyResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompanyCompanyResponseDTO): CompanyCompanyResponseEntity {
        return {
            data: param.data
        }
    }

    public mapToList(params: ICompanyCompanyResponseDTO[]): CompanyCompanyResponseEntity[] {
        return params.map((param: ICompanyCompanyResponseDTO) => {
            return this.mapTo(param);
        })
    }
}