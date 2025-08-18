import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  warnings?: string[];
}

export interface EntityExistsResult {
  exists: boolean;
  conflictingFiles: string[];
  message: string;
}

export class ProjectValidator {
  
  /**
   * Valida que la estructura del proyecto sea la correcta
   */
  static async validateProjectStructure(basePath: string, apiName: string = 'platform'): Promise<ValidationResult> {
    console.log(chalk.blue('🔍 Validando estructura del proyecto...'));
    
    // Determinar si estamos en el directorio de la API o necesitamos crear uno
    const currentDirName = path.basename(basePath);
    const shouldCreateApiDir = currentDirName !== apiName;
    const apiPrefix = shouldCreateApiDir ? `${apiName}/` : '';
    
    const requiredDirectories = [
      `${apiPrefix}domain/models/apis/${apiName}/entities`,
      `${apiPrefix}domain/services/repositories/apis/${apiName}/entities`,
      `${apiPrefix}domain/services/use_cases/apis/${apiName}/entities`,
      `${apiPrefix}infrastructure/entities/apis/${apiName}/entities`,
      `${apiPrefix}infrastructure/mappers/apis/${apiName}/entities`,
      `${apiPrefix}infrastructure/repositories/apis/${apiName}/repositories/entities`,
      `${apiPrefix}facade/apis/${apiName}/entities`
    ];

    const missingDirectories: string[] = [];
    const warnings: string[] = [];

    // Verificar que el directorio base existe
    if (!await fs.pathExists(basePath)) {
      return {
        isValid: false,
        message: `❌ El directorio base no existe: ${basePath}`
      };
    }

    // Verificar directorios requeridos
    for (const dir of requiredDirectories) {
      const fullPath = path.join(basePath, dir);
      if (!await fs.pathExists(fullPath)) {
        missingDirectories.push(dir);
      }
    }

    // Verificar archivos de configuración clave
    const coreFiles = [
      'core/interfaces/index.ts',
      'core/classes/index.ts',
      'core/axios/platform-axios.ts'
    ];

    for (const file of coreFiles) {
      const fullPath = path.join(basePath, file);
      if (!await fs.pathExists(fullPath)) {
        warnings.push(`⚠️  Archivo core no encontrado: ${file}`);
      }
    }

    // Ser más permisivo - no bloquear por directorios faltantes
    if (missingDirectories.length > 0) {
      warnings.push(`Se crearán los directorios faltantes automáticamente: ${missingDirectories.length} directorios`);
    }

    // Verificar que parece ser un proyecto goluti-frontend
    const indicatorFiles = [
      'core/const/const-platform-api-routes.ts',
      'core/injection/injection-core.ts'
    ];

    let projectIndicators = 0;
    for (const file of indicatorFiles) {
      const fullPath = path.join(basePath, file);
      if (await fs.pathExists(fullPath)) {
        projectIndicators++;
      }
    }

    if (projectIndicators === 0) {
      warnings.push('⚠️  No se detectaron archivos característicos del proyecto goluti-frontend');
    }

    return {
      isValid: true,
      message: '✅ Estructura del proyecto válida',
      warnings
    };
  }

  /**
   * Verifica si una entidad ya existe en el proyecto
   */
  static async checkEntityExists(entityName: string, basePath: string, apiName: string = 'platform'): Promise<EntityExistsResult> {
    const entityNameLower = entityName.toLowerCase();
    const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    
    console.log(chalk.blue(`🔍 Verificando si la entidad "${entityName}" ya existe...`));

    const conflictingFiles: string[] = [];

    // Determinar si estamos en el directorio de la API o necesitamos crear uno
    const currentDirName = path.basename(basePath);
    const shouldCreateApiDir = currentDirName !== apiName;
    const apiPrefix = shouldCreateApiDir ? `${apiName}/` : '';

    // Directorios donde buscar archivos de la entidad (usando apiName dinámico)
    const searchPaths = [
      `${apiPrefix}domain/models/apis/${apiName}/entities/${entityNameLower}`,
      `${apiPrefix}domain/services/repositories/apis/${apiName}/entities/i-${entityNameKebab}-repository.ts`,
      `${apiPrefix}domain/services/use_cases/apis/${apiName}/entities/${entityNameLower}`,
      `${apiPrefix}infrastructure/entities/apis/${apiName}/entities/${entityNameLower}`,
      `${apiPrefix}infrastructure/mappers/apis/${apiName}/entities/${entityNameLower}`,
      `${apiPrefix}infrastructure/repositories/apis/${apiName}/repositories/entities/${entityNameLower}`,
      `${apiPrefix}facade/apis/${apiName}/entities/${entityNameKebab}-facade.ts`
    ];

    for (const searchPath of searchPaths) {
      const fullPath = path.join(basePath, searchPath);
      
      if (await fs.pathExists(fullPath)) {
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          // Si es directorio, verificar si tiene archivos
          const files = await fs.readdir(fullPath);
          if (files.length > 0) {
            conflictingFiles.push(`📁 ${searchPath}/ (${files.length} archivos)`);
          }
        } else {
          // Si es archivo
          conflictingFiles.push(`📄 ${searchPath}`);
        }
      }
    }

    const exists = conflictingFiles.length > 0;
    
    return {
      exists,
      conflictingFiles,
      message: exists 
        ? `⚠️  La entidad "${entityName}" ya existe parcial o completamente`
        : `✅ La entidad "${entityName}" no existe, se puede generar`
    };
  }

  /**
   * Verifica si una entidad de negocio ya existe en el proyecto
   */
  static async checkBusinessEntityExists(entityName: string, basePath: string, apiName: string = 'platform'): Promise<EntityExistsResult> {
    const entityNameLower = entityName.toLowerCase();
    const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    
    const conflictingFiles: string[] = [];

    // Determinar si estamos en el directorio de la API o necesitamos crear uno
    const currentDirName = path.basename(basePath);
    const shouldCreateApiDir = currentDirName !== apiName;
    const apiPrefix = shouldCreateApiDir ? `${apiName}/` : '';

    // Directorios donde buscar archivos de la entidad de negocio (usando business en lugar de entities)
    const searchPaths = [
      `${apiPrefix}domain/models/apis/${apiName}/business/${entityNameLower}`,
      `${apiPrefix}domain/services/repositories/apis/${apiName}/business/i-${entityNameKebab}-repository.ts`,
      `${apiPrefix}domain/services/use_cases/apis/${apiName}/business/${entityNameLower}`,
      `${apiPrefix}infrastructure/entities/apis/${apiName}/business/${entityNameLower}`,
      `${apiPrefix}infrastructure/mappers/apis/${apiName}/business/${entityNameLower}`,
      `${apiPrefix}infrastructure/repositories/apis/${apiName}/repositories/business/${entityNameLower}`,
      `${apiPrefix}facade/apis/${apiName}/business/${entityNameKebab}-facade.ts`
    ];

    for (const searchPath of searchPaths) {
      const fullPath = path.join(basePath, searchPath);
      
      if (await fs.pathExists(fullPath)) {
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          // Si es directorio, verificar si tiene archivos
          const files = await fs.readdir(fullPath);
          if (files.length > 0) {
            conflictingFiles.push(`📁 ${searchPath}/ (${files.length} archivos)`);
          }
        } else {
          // Si es archivo
          conflictingFiles.push(`📄 ${searchPath}`);
        }
      }
    }

    const exists = conflictingFiles.length > 0;

    return {
      exists,
      conflictingFiles: conflictingFiles,
      message: exists 
        ? `⚠️  La entidad de negocio "${entityName}" ya existe parcial o completamente`
        : `✅ La entidad de negocio "${entityName}" no existe, se puede generar`
    };
  }

  /**
   * Valida la configuración completa antes de generar
   */
  static async validateBeforeGeneration(entityName: string, basePath: string, apiName: string = 'platform'): Promise<{
    canProceed: boolean;
    structureResult: ValidationResult;
    entityResult: EntityExistsResult;
    recommendations: string[];
  }> {
    
    console.log(chalk.yellow('\n🔍 Ejecutando validaciones pre-generación...\n'));

    const structureResult = await this.validateProjectStructure(basePath, apiName);
    const entityResult = await this.checkEntityExists(entityName, basePath, apiName);
    
    const recommendations: string[] = [];
    let canProceed = structureResult.isValid;

    // Mostrar resultados de validación
    console.log(structureResult.message);
    if (structureResult.warnings) {
      structureResult.warnings.forEach(warning => console.log(chalk.yellow(warning)));
    }

    console.log(entityResult.message);
    if (entityResult.conflictingFiles.length > 0) {
      console.log(chalk.yellow('\nArchivos/directorios existentes:'));
      entityResult.conflictingFiles.forEach(file => 
        console.log(chalk.gray(`  ${file}`))
      );
    }

    // Generar recomendaciones
    if (!structureResult.isValid) {
      recommendations.push('Verifica que estés ejecutando el comando en el directorio correcto del proyecto goluti-frontend');
      canProceed = false;
    }

    if (entityResult.exists) {
      recommendations.push('La entidad ya existe. Si continúas, se sobrescribirán los archivos existentes');
      recommendations.push('Considera hacer un backup antes de continuar');
      // No bloqueamos la generación, pero advertimos
    }

    if (structureResult.warnings && structureResult.warnings.length > 0) {
      recommendations.push('Algunas dependencias core no fueron encontradas. El código generado podría necesitar ajustes');
    }

    return {
      canProceed,
      structureResult,
      entityResult,
      recommendations
    };
  }

  /**
   * Muestra un resumen de lo que se va a generar
   */
  static showGenerationSummary(entityName: string, basePath: string, willOverwrite: boolean): void {
    const entityNameLower = entityName.toLowerCase();
    const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

    console.log(chalk.blue('\n📋 Resumen de generación:'));
    console.log(chalk.gray(`Entidad: ${entityName}`));
    console.log(chalk.gray(`Ubicación: ${basePath}`));
    console.log(chalk.gray(`Archivos a generar: ~29 archivos TypeScript`));
    
    if (willOverwrite) {
      console.log(chalk.yellow('⚠️  Se sobrescribirán archivos existentes'));
    }

    console.log(chalk.blue('\n📁 Directorios que se crearán/utilizarán:'));
    const directories = [
      `📂 domain/models/apis/platform/entities/${entityNameLower}/`,
      `📂 domain/services/use_cases/apis/platform/entities/${entityNameLower}/`,
      `📂 infrastructure/entities/apis/platform/entities/${entityNameLower}/`,
      `📂 infrastructure/mappers/apis/platform/entities/${entityNameLower}/`,
      `📂 infrastructure/repositories/.../entities/${entityNameLower}/`,
      `📂 facade/apis/platform/entities/`,
      `📂 injection folders...`
    ];

    directories.forEach(dir => console.log(chalk.gray(`  ${dir}`)));
  }
}
