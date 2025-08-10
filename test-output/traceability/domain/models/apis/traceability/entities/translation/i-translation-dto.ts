export interface ITranslationDTO {
  key: string;
  languageCode: string;
  translation: string;
  context?: string;
  state?: boolean;
}