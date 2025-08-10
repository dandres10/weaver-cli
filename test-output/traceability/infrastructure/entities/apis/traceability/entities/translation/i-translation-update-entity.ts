export interface ITranslationUpdateEntity {
  key?: string;
  language_code?: string;
  translation?: string;
  context?: string;
  state?: boolean;
}