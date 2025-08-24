import { Mapper } from "@bus/core/classes";
import { ILanguageDeleteDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";

export class LanguageDeleteMapper extends Mapper<ILanguageDeleteEntity, ILanguageDeleteDTO> {

  private static instance: LanguageDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): LanguageDeleteMapper {
    if (!LanguageDeleteMapper.instance)
      LanguageDeleteMapper.instance = new LanguageDeleteMapper();
    return LanguageDeleteMapper.instance;
  }

  public mapFrom(param: ILanguageDeleteEntity): ILanguageDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ILanguageDeleteEntity[]): ILanguageDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILanguageDeleteDTO): ILanguageDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ILanguageDeleteDTO[]): ILanguageDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}