// Punto de entrada principal para la librería
export { createCorrectEntityFlow } from './generators/correct-entity-flow-generator';
export { showMainMenu } from './cli';

// Tipos y interfaces principales
export interface GeneratorConfig {
  basePath: string;
  entityName: string;
  generateTests?: boolean;
  generateStorybook?: boolean;
}

export interface FileTemplate {
  path: string;
  content: string;
}

// Versión de la librería
export const version = '1.0.0';
