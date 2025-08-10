export interface ITranslationUpdateDTO {
  key?: string;
  languageCode?: string;
  translation?: string;
  context?: string;
  state?: boolean;
}