import { Mapper } from "@bus/core/classes";
import { ILanguageDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";

export class LanguageEntityMapper extends Mapper<ILanguageEntity, ILanguageDTO> {
  private static instance: LanguageEntityMapper;
  public constructor() { super(); }

  public static getInstance(): LanguageEntityMapper {
    if (!LanguageEntityMapper.instance)
      LanguageEntityMapper.instance = new LanguageEntityMapper();
    return LanguageEntityMapper.instance;
  }

  public mapFrom(param: ILanguageEntity): ILanguageDTO {
    return {
      id: param.id,
      id: param.id,
      name: param.name,
      code: param.code,
      nativeName: param.native_name,
      state: param.state
    };
  }

  public mapFromList(params: ILanguageEntity[]): ILanguageDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILanguageDTO): ILanguageEntity {
    return {
      id: param.id,
      id: param.id,
      name: param.name,
      code: param.code,
      native_name: param.nativeName,
      state: param.state
    };
  }

  public mapToList(params: ILanguageDTO[]): ILanguageEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}