import { Mapper } from "@bus/core/classes";
import { ICompanyCompanyRequestDTO } from "@platform/domain/models/apis/platform/business/company";
import { CompanyCompanyRequestEntity } from "@platform/infrastructure/entities/apis/platform/business/company";

export class CompanyCompanyRequestMapper extends Mapper<CompanyCompanyRequestEntity, ICompanyCompanyRequestDTO> {

    private static instance: CompanyCompanyRequestMapper;

    public constructor() { super(); }

    public static getInstance(): CompanyCompanyRequestMapper {
        if (!CompanyCompanyRequestMapper.instance)
            CompanyCompanyRequestMapper.instance = new CompanyCompanyRequestMapper();
        return CompanyCompanyRequestMapper.instance;
    }

    public mapFrom(param: CompanyCompanyRequestEntity): ICompanyCompanyRequestDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state
        }
    }

    public mapFromList(params: CompanyCompanyRequestEntity[]): ICompanyCompanyRequestDTO[] {
        return params.map((param: CompanyCompanyRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompanyCompanyRequestDTO): CompanyCompanyRequestEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state
        }
    }

    public mapToList(params: ICompanyCompanyRequestDTO[]): CompanyCompanyRequestEntity[] {
        return params.map((param: ICompanyCompanyRequestDTO) => {
            return this.mapTo(param);
        })
    }
}