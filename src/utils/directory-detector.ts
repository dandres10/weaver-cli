import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export interface DirectoryInfo {
  currentApiName: string | null;
  detectedFromPath: boolean;
  possibleApiNames: string[];
  baseDirectory: string;
}

export class DirectoryDetector {
  
  /**
   * Detecta el API name del directorio actual
   */
  static async detectCurrentApi(): Promise<DirectoryInfo> {
    const currentDir = process.cwd();
    const baseName = path.basename(currentDir);
    
    // Verificar si estamos dentro de un directorio que parece ser un API
    const isLikelyApiDirectory = await this.isApiDirectory(currentDir);
    
    // Buscar APIs hermanas (directorios al mismo nivel)
    const parentDir = path.dirname(currentDir);
    const siblingApis = await this.findSiblingApis(parentDir, baseName);
    
    return {
      currentApiName: isLikelyApiDirectory ? baseName : null,
      detectedFromPath: isLikelyApiDirectory,
      possibleApiNames: siblingApis,
      baseDirectory: currentDir
    };
  }
  
  /**
   * Verifica si un directorio parece ser un API (tiene estructura típica)
   */
  private static async isApiDirectory(dirPath: string): Promise<boolean> {
    const indicatorPaths = [
      'domain',
      'infrastructure', 
      'facade',
      'core',
      'domain/models',
      'domain/services'
    ];
    
    let foundIndicators = 0;
    for (const indicator of indicatorPaths) {
      const fullPath = path.join(dirPath, indicator);
      if (await fs.pathExists(fullPath)) {
        foundIndicators++;
      }
    }
    
    // Si encuentra al menos 2 indicadores, probablemente es un API
    return foundIndicators >= 2;
  }
  
  /**
   * Encuentra APIs hermanas en el directorio padre
   */
  private static async findSiblingApis(parentDir: string, currentDirName: string): Promise<string[]> {
    try {
      const siblings: string[] = [];
      const entries = await fs.readdir(parentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const siblingPath = path.join(parentDir, entry.name);
          const isApi = await this.isApiDirectory(siblingPath);
          
          if (isApi) {
            siblings.push(entry.name);
          }
        }
      }
      
      return siblings.sort();
    } catch (error) {
      console.log(chalk.yellow('⚠️  No se pudo analizar el directorio padre'));
      return [currentDirName].filter(Boolean);
    }
  }
  
  /**
   * Calcula la ruta de generación según el API target
   */
  static calculateTargetPath(baseDir: string, currentApiName: string | null, targetApiName: string): string {
    if (currentApiName === targetApiName) {
      // Generar en el directorio actual
      return baseDir;
    } else {
      // Generar en directorio hermano
      const parentDir = path.dirname(baseDir);
      return path.join(parentDir, targetApiName);
    }
  }
  
  /**
   * Valida que el directorio target sea accesible
   */
  static async validateTargetPath(targetPath: string): Promise<{ isValid: boolean; message: string }> {
    try {
      // Verificar si el directorio existe
      if (await fs.pathExists(targetPath)) {
        // Verificar permisos de escritura
        await fs.access(targetPath, fs.constants.W_OK);
        return {
          isValid: true,
          message: `Directorio target válido: ${targetPath}`
        };
      } else {
        // El directorio no existe, pero podemos crearlo
        const parentDir = path.dirname(targetPath);
        if (await fs.pathExists(parentDir)) {
          return {
            isValid: true,
            message: `Se creará el directorio: ${targetPath}`
          };
        } else {
          return {
            isValid: false,
            message: `El directorio padre no existe: ${parentDir}`
          };
        }
      }
    } catch (error) {
      return {
        isValid: false,
        message: `Sin permisos de escritura en: ${targetPath}`
      };
    }
  }
}
