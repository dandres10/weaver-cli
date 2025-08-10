import { Mapper } from "@bus/core/classes";
import { ITranslationReadDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationReadEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";

export class TranslationReadMapper extends Mapper<ITranslationReadEntity, ITranslationReadDTO> {

  private static instance: TranslationReadMapper;
  public constructor() { super(); }

  public static getInstance(): TranslationReadMapper {
    if (!TranslationReadMapper.instance)
      TranslationReadMapper.instance = new TranslationReadMapper();
    return TranslationReadMapper.instance;
  }

  public mapFrom(param: ITranslationReadEntity): ITranslationReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ITranslationReadEntity[]): ITranslationReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITranslationReadDTO): ITranslationReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ITranslationReadDTO[]): ITranslationReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}