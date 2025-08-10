import { Mapper } from "@bus/core/classes";
import { ITranslationDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";

export class TranslationEntityMapper extends Mapper<ITranslationEntity, ITranslationDTO> {
  private static instance: TranslationEntityMapper;
  public constructor() { super(); }

  public static getInstance(): TranslationEntityMapper {
    if (!TranslationEntityMapper.instance)
      TranslationEntityMapper.instance = new TranslationEntityMapper();
    return TranslationEntityMapper.instance;
  }

  public mapFrom(param: ITranslationEntity): ITranslationDTO {
    return {
      key: param.key,
      languageCode: param.language_code,
      translation: param.translation,
      context: param.context,
      state: param.state
    };
  }

  public mapFromList(params: ITranslationEntity[]): ITranslationDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITranslationDTO): ITranslationEntity {
    return {
      key: param.key,
      language_code: param.languageCode,
      translation: param.translation,
      context: param.context,
      state: param.state
    };
  }

  public mapToList(params: ITranslationDTO[]): ITranslationEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}