import { Mapper } from "@bus/core/classes";
import { ILanguageSaveDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";

export class LanguageSaveMapper extends Mapper<ILanguageSaveEntity, ILanguageSaveDTO> {

  private static instance: LanguageSaveMapper;
  public constructor() { super(); }

  public static getInstance(): LanguageSaveMapper {
    if (!LanguageSaveMapper.instance)
      LanguageSaveMapper.instance = new LanguageSaveMapper();
    return LanguageSaveMapper.instance;
  }

  public mapFrom(param: ILanguageSaveEntity): ILanguageSaveDTO {
    return {
      name: param.name,
      code: param.code,
      nativeName: param.native_name,
      state: param.state
    };
  }

  public mapFromList(params: ILanguageSaveEntity[]): ILanguageSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILanguageSaveDTO): ILanguageSaveEntity {
    return {
      name: param.name,
      code: param.code,
      native_name: param.nativeName,
      state: param.state ?? true
    };
  }

  public mapToList(params: ILanguageSaveDTO[]): ILanguageSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}