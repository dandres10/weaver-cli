import { Mapper } from "@bus/core/classes";
import { ITranslationDeleteDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationDeleteEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";

export class TranslationDeleteMapper extends Mapper<ITranslationDeleteEntity, ITranslationDeleteDTO> {

  private static instance: TranslationDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): TranslationDeleteMapper {
    if (!TranslationDeleteMapper.instance)
      TranslationDeleteMapper.instance = new TranslationDeleteMapper();
    return TranslationDeleteMapper.instance;
  }

  public mapFrom(param: ITranslationDeleteEntity): ITranslationDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ITranslationDeleteEntity[]): ITranslationDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITranslationDeleteDTO): ITranslationDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ITranslationDeleteDTO[]): ITranslationDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}