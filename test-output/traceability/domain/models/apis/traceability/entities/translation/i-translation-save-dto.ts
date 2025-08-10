export interface ITranslationSaveDTO {
  key: string;
  languageCode: string;
  translation: string;
  context?: string;
  state?: boolean;
}