import { Mapper } from "@bus/core/classes";
import { ICompany{id}ResponseDTO } from "@platform/domain/models/apis/platform/business/company";
import { Company{id}ResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/company";

export class Company{id}ResponseMapper extends Mapper<Company{id}ResponseEntity, ICompany{id}ResponseDTO> {

    private static instance: Company{id}ResponseMapper;

    public constructor() { super(); }

    public static getInstance(): Company{id}ResponseMapper {
        if (!Company{id}ResponseMapper.instance)
            Company{id}ResponseMapper.instance = new Company{id}ResponseMapper();
        return Company{id}ResponseMapper.instance;
    }

    public mapFrom(param: Company{id}ResponseEntity): ICompany{id}ResponseDTO {
        return {
            data: param.data
        }
    }

    public mapFromList(params: Company{id}ResponseEntity[]): ICompany{id}ResponseDTO[] {
        return params.map((param: Company{id}ResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompany{id}ResponseDTO): Company{id}ResponseEntity {
        return {
            data: param.data
        }
    }

    public mapToList(params: ICompany{id}ResponseDTO[]): Company{id}ResponseEntity[] {
        return params.map((param: ICompany{id}ResponseDTO) => {
            return this.mapTo(param);
        })
    }
}