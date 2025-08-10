import { Mapper } from "@bus/core/classes";
import { ITranslationSaveDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationSaveEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";

export class TranslationSaveMapper extends Mapper<ITranslationSaveEntity, ITranslationSaveDTO> {

  private static instance: TranslationSaveMapper;
  public constructor() { super(); }

  public static getInstance(): TranslationSaveMapper {
    if (!TranslationSaveMapper.instance)
      TranslationSaveMapper.instance = new TranslationSaveMapper();
    return TranslationSaveMapper.instance;
  }

  public mapFrom(param: ITranslationSaveEntity): ITranslationSaveDTO {
    return {
      key: param.key,
      languageCode: param.language_code,
      translation: param.translation,
      context: param.context,
      state: param.state
    };
  }

  public mapFromList(params: ITranslationSaveEntity[]): ITranslationSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITranslationSaveDTO): ITranslationSaveEntity {
    return {
      key: param.key,
      language_code: param.languageCode,
      translation: param.translation,
      context: param.context,
      state: param.state ?? true
    };
  }

  public mapToList(params: ITranslationSaveDTO[]): ITranslationSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}