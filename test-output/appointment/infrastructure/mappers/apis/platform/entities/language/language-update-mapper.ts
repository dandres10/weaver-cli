import { Mapper } from "@bus/core/classes";
import { ILanguageUpdateDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";

export class LanguageUpdateMapper extends Mapper<ILanguageUpdateEntity, ILanguageUpdateDTO> {

  private static instance: LanguageUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): LanguageUpdateMapper {
    if (!LanguageUpdateMapper.instance)
      LanguageUpdateMapper.instance = new LanguageUpdateMapper();
    return LanguageUpdateMapper.instance;
  }

  public mapFrom(param: ILanguageUpdateEntity): ILanguageUpdateDTO {
    return {
      id: param.id,
      name: param.name,
      code: param.code,
      nativeName: param.native_name,
      state: param.state
    };
  }

  public mapFromList(params: ILanguageUpdateEntity[]): ILanguageUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILanguageUpdateDTO): ILanguageUpdateEntity {
    return {
      id: param.id,
      name: param.name,
      code: param.code,
      native_name: param.nativeName,
      state: param.state
    };
  }

  public mapToList(params: ILanguageUpdateDTO[]): ILanguageUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}