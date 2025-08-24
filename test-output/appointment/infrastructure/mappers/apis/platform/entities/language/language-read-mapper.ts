import { Mapper } from "@bus/core/classes";
import { ILanguageReadDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";

export class LanguageReadMapper extends Mapper<ILanguageReadEntity, ILanguageReadDTO> {

  private static instance: LanguageReadMapper;
  public constructor() { super(); }

  public static getInstance(): LanguageReadMapper {
    if (!LanguageReadMapper.instance)
      LanguageReadMapper.instance = new LanguageReadMapper();
    return LanguageReadMapper.instance;
  }

  public mapFrom(param: ILanguageReadEntity): ILanguageReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ILanguageReadEntity[]): ILanguageReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILanguageReadDTO): ILanguageReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ILanguageReadDTO[]): ILanguageReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}