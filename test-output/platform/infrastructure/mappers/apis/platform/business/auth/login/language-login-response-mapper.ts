import { Mapper } from "@bus/core/classes";
import { ILanguageLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { ILanguageLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class LanguageLoginResponseMapper extends Mapper<ILanguageLoginResponseEntity, ILanguageLoginResponseDTO> {

    private static instance: LanguageLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): LanguageLoginResponseMapper {
        if (!LanguageLoginResponseMapper.instance)
            LanguageLoginResponseMapper.instance = new LanguageLoginResponseMapper();
        return LanguageLoginResponseMapper.instance;
    }

    public mapFrom(param: ILanguageLoginResponseEntity): ILanguageLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    public mapFromList(params: ILanguageLoginResponseEntity[]): ILanguageLoginResponseDTO[] {
        return params.map((param: ILanguageLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ILanguageLoginResponseDTO): ILanguageLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    public mapToList(params: ILanguageLoginResponseDTO[]): ILanguageLoginResponseEntity[] {
        return params.map((param: ILanguageLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}