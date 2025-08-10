import { Mapper } from "@bus/core/classes";
import { ITranslationUpdateDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";

export class TranslationUpdateMapper extends Mapper<ITranslationUpdateEntity, ITranslationUpdateDTO> {

  private static instance: TranslationUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): TranslationUpdateMapper {
    if (!TranslationUpdateMapper.instance)
      TranslationUpdateMapper.instance = new TranslationUpdateMapper();
    return TranslationUpdateMapper.instance;
  }

  public mapFrom(param: ITranslationUpdateEntity): ITranslationUpdateDTO {
    return {
      key: param.key,
      languageCode: param.language_code,
      translation: param.translation,
      context: param.context,
      state: param.state
    };
  }

  public mapFromList(params: ITranslationUpdateEntity[]): ITranslationUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITranslationUpdateDTO): ITranslationUpdateEntity {
    return {
      key: param.key,
      language_code: param.languageCode,
      translation: param.translation,
      context: param.context,
      state: param.state
    };
  }

  public mapToList(params: ITranslationUpdateDTO[]): ITranslationUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}