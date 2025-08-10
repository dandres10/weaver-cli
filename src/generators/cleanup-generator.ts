import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';

// Tipos para el cleanup
export interface CleanupOptions {
  basePath: string;
  cleanupType: 'entity' | 'api' | 'all' | 'injection';
  entityName?: string;
  apiName?: string;
}

export interface DetectedEntity {
  name: string;
  apiName: string;
  paths: string[];
}

export interface DetectedAPI {
  name: string;
  entities: string[];
  totalFiles: number;
}

/**
 * Detecta todas las entidades generadas en el proyecto
 */
export async function detectGeneratedEntities(basePath: string): Promise<DetectedEntity[]> {
  const entities: DetectedEntity[] = [];
  
  try {
    const currentPath = path.resolve(basePath);
    
    // Detectar si estamos en modo test-output o proyecto real
    const isTestOutput = currentPath.includes('test-output');
    
    let actualBasePath: string;
    
    if (isTestOutput) {
      // Para test-output, encontrar la raíz de test-output
      actualBasePath = currentPath;
      while (!actualBasePath.endsWith('test-output') && actualBasePath.includes('test-output')) {
        actualBasePath = path.dirname(actualBasePath);
      }
    } else {
      // Para proyecto real, buscar dinámicamente desde el directorio actual
      actualBasePath = await findBestBasePath(currentPath);
    }
    

    
    if (isTestOutput) {
      // Modo test-output: buscar APIs como directorios principales
      const apisPath = path.join(actualBasePath);
      if (!await fs.pathExists(apisPath)) {
        return entities;
      }
      
      const apiDirs = await fs.readdir(apisPath);
      
      for (const apiDir of apiDirs) {
        const apiPath = path.join(apisPath, apiDir);
        if (!await fs.pathExists(apiPath)) continue;
        const stat = await fs.stat(apiPath);
        if (!stat.isDirectory()) continue;
        
        await detectEntitiesInAPI(actualBasePath, apiDir, apiPath, entities);
      }
    } else {
      // Modo proyecto real: buscar en domain/models/apis/
      const domainModelsPath = path.join(actualBasePath, 'domain/models/apis');
      
      if (await fs.pathExists(domainModelsPath)) {
        const apiDirs = await fs.readdir(domainModelsPath);
        
        for (const apiDir of apiDirs) {
          const apiPath = path.join(domainModelsPath, apiDir);
          if (!await fs.pathExists(apiPath)) continue;
          const stat = await fs.stat(apiPath);
          if (!stat.isDirectory()) continue;
          
          // Para proyecto real, la estructura es /bus/domain/models/apis/{api}/entities/
          const entitiesPath = path.join(apiPath, 'entities');
          
          if (await fs.pathExists(entitiesPath)) {
            const entityDirs = await fs.readdir(entitiesPath);
            
            for (const entityDir of entityDirs) {
              const entityPath = path.join(entitiesPath, entityDir);
              
              if (!await fs.pathExists(entityPath)) continue;
              const entityStat = await fs.stat(entityPath);
              
              if (entityStat.isDirectory()) {
                const files = await fs.readdir(entityPath);
                const hasRelevantFiles = files.some(file => 
                  file.includes('-dto.ts') || 
                  file.includes('-entity.ts') ||
                  file.includes('-use-case.ts') ||
                  file === 'index.ts'
                );
                
                if (hasRelevantFiles) {
                  const entityPaths = await getEntityAllPaths(actualBasePath, apiDir, entityDir);
                  entities.push({
                    name: entityDir,
                    apiName: apiDir,
                    paths: entityPaths
                  });
                }
              }
            }
          }
        }
      }
      
      // También buscar facades en proyecto real
      const facadeApisPath = path.join(actualBasePath, 'facade/apis');
      
      if (await fs.pathExists(facadeApisPath)) {
        const apiDirs = await fs.readdir(facadeApisPath);
        
        for (const apiDir of apiDirs) {
          const facadePath = path.join(facadeApisPath, apiDir, 'entities');
          if (await fs.pathExists(facadePath)) {
            const facadeFiles = await fs.readdir(facadePath);
            
            for (const facadeFile of facadeFiles) {
              if (facadeFile.endsWith('-facade.ts') && !facadeFile.startsWith('injection-')) {
                const entityName = facadeFile.replace('-facade.ts', '');
                const alreadyExists = entities.some(e => e.name.toLowerCase() === entityName.toLowerCase());
                if (!alreadyExists) {
                  const entityPaths = await getEntityAllPaths(actualBasePath, apiDir, entityName);
                  entities.push({
                    name: entityName,
                    apiName: apiDir,
                    paths: entityPaths
                  });
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Error detectando entidades: ${error}`));
  }
  
  return entities;
}

/**
 * Encuentra el mejor directorio base para buscar entidades dinámicamente
 */
async function findBestBasePath(currentPath: string): Promise<string> {
  // Estrategia 1: Si estamos en una subcarpeta de estructura Weaver, encontrar la raíz de esa estructura
  if (currentPath.includes('/domain/models/apis/') || currentPath.includes('\\domain\\models\\apis\\')) {
    // Estamos en domain/models/apis, subir hasta antes de domain
    const pathParts = currentPath.split(path.sep);
    const domainIndex = pathParts.lastIndexOf('domain');
    if (domainIndex > 0) {
      const basePath = pathParts.slice(0, domainIndex).join(path.sep);
      return basePath;
    }
  }
  
  if (currentPath.includes('/facade/apis/') || currentPath.includes('\\facade\\apis\\')) {
    // Estamos en facade/apis, subir hasta antes de facade
    const pathParts = currentPath.split(path.sep);
    const facadeIndex = pathParts.lastIndexOf('facade');
    if (facadeIndex > 0) {
      const basePath = pathParts.slice(0, facadeIndex).join(path.sep);
      return basePath;
    }
  }
  
  // Estrategia 2: Buscar hacia arriba hasta encontrar estructura de Weaver
  let searchPath = currentPath;
  let levelsUp = 0;
  const maxLevels = 10;
  
  while (levelsUp < maxLevels && searchPath !== path.dirname(searchPath)) {
    // Verificar si este directorio contiene estructura de Weaver
    const hasWeaverStructure = await hasWeaverGeneratedContent(searchPath);
    if (hasWeaverStructure) {
      return searchPath;
    }
    
    // Verificar subcarpetas comunes donde puede estar la estructura
    const commonDirs = ['bus', 'platform', 'core', 'app', 'modules', 'src'];
    for (const dir of commonDirs) {
      const possiblePath = path.join(searchPath, dir);
      if (await fs.pathExists(possiblePath)) {
        const hasStructure = await hasWeaverGeneratedContent(possiblePath);
        if (hasStructure) {
          return possiblePath;
        }
      }
    }
    
    searchPath = path.dirname(searchPath);
    levelsUp++;
  }
  
  return currentPath;
}

/**
 * Encuentra el directorio raíz del proyecto desde cualquier subcarpeta (función legacy)
 */
async function findProjectRoot(startPath: string): Promise<string> {
  let currentPath = path.resolve(startPath);
  
  // Si estamos en modo local y startPath contiene test-output, usar el directorio directamente
  if (startPath.includes('test-output')) {
    // Si ya estamos en test-output, usar como está
    if (currentPath.endsWith('test-output')) {
      return currentPath;
    }
    // Si estamos en una subcarpeta de test-output, subir hasta test-output
    while (!currentPath.endsWith('test-output') && currentPath.includes('test-output')) {
      currentPath = path.dirname(currentPath);
    }
    if (currentPath.endsWith('test-output') || currentPath.includes('test-output')) {
      return currentPath;
    }
  }
  
  // Para proyectos reales - buscar desde el directorio actual hacia arriba
  let searchPath = currentPath;
  
  while (searchPath !== path.dirname(searchPath)) {
    // Buscar cualquier directorio que pueda contener estructura de Weaver
    const possibleWeaverDirs = ['bus', 'platform', 'core', 'app', 'modules'];
    
    for (const weaverDir of possibleWeaverDirs) {
      if (searchPath.endsWith(weaverDir)) {
        // Verificar si esta carpeta tiene contenido generado por Weaver
        const hasGeneratedContent = await hasWeaverGeneratedContent(searchPath);
        if (hasGeneratedContent) {
          return searchPath;
        }
      }
    }
    
    // Buscar indicadores de que es un directorio de proyecto frontend
    const packageJsonPath = path.join(searchPath, 'package.json');
    const srcPath = path.join(searchPath, 'src');
    
    if (await fs.pathExists(packageJsonPath) && await fs.pathExists(srcPath)) {
      // Buscar cualquier subdirectorio en src/ que tenga estructura de Weaver
      const srcContents = await fs.readdir(srcPath);
      
      for (const item of srcContents) {
        const itemPath = path.join(srcPath, item);
        const stat = await fs.stat(itemPath);
        if (stat.isDirectory()) {
          const hasGeneratedContent = await hasWeaverGeneratedContent(itemPath);
          if (hasGeneratedContent) {
            return itemPath;
          }
        }
      }
    }
    
    searchPath = path.dirname(searchPath);
  }
  
  // Si estamos en una subcarpeta de cualquier directorio de Weaver, subir hasta encontrarlo
  const weaverDirs = ['bus', 'platform', 'core', 'app', 'modules'];
  for (const weaverDir of weaverDirs) {
    if (currentPath.includes(`/${weaverDir}/`) || currentPath.includes(`\\${weaverDir}\\`)) {
      let targetPath = currentPath;
      while (!targetPath.endsWith(weaverDir) && targetPath.includes(weaverDir) && targetPath !== path.dirname(targetPath)) {
        targetPath = path.dirname(targetPath);
      }
      if (targetPath.endsWith(weaverDir)) {
        const hasGeneratedContent = await hasWeaverGeneratedContent(targetPath);
        if (hasGeneratedContent) {
          return targetPath;
        }
      }
    }
  }
  
  // Si no encontramos nada, usar el directorio original
  return startPath;
}

/**
 * Verifica si un directorio contiene contenido generado por Weaver
 */
async function hasWeaverGeneratedContent(dirPath: string): Promise<boolean> {
  try {
    // Buscar directorios que indiquen estructura de Weaver
    const domainPath = path.join(dirPath, 'domain');
    const infrastructurePath = path.join(dirPath, 'infrastructure');
    const facadePath = path.join(dirPath, 'facade');
    
    return await fs.pathExists(domainPath) || 
           await fs.pathExists(infrastructurePath) || 
           await fs.pathExists(facadePath);
  } catch {
    return false;
  }
}

/**
 * Detecta entidades en una API específica (para modo test-output)
 */
async function detectEntitiesInAPI(basePath: string, apiName: string, apiPath: string, entities: DetectedEntity[]): Promise<void> {
  // Buscar entidades en domain/models
  const entitiesBasePath = path.join(apiPath, 'domain/models/apis', apiName, 'entities');
  
  if (await fs.pathExists(entitiesBasePath)) {
    const entityDirs = await fs.readdir(entitiesBasePath);
    
    for (const entityDir of entityDirs) {
      const entityPath = path.join(entitiesBasePath, entityDir);
      
      if (!await fs.pathExists(entityPath)) continue;
      const entityStat = await fs.stat(entityPath);
      
      if (entityStat.isDirectory()) {
        const files = await fs.readdir(entityPath);
        const hasRelevantFiles = files.some(file => 
          file.includes('-dto.ts') || 
          file.includes('-entity.ts') ||
          file.includes('-use-case.ts') ||
          file === 'index.ts'
        );
        
        if (hasRelevantFiles) {
          const entityPaths = await getEntityAllPaths(basePath, apiName, entityDir);
          entities.push({
            name: entityDir,
            apiName: apiName,
            paths: entityPaths
          });
        }
      }
    }
  }
  
  // También buscar en facade
  const facadePath = path.join(apiPath, 'facade/apis', apiName, 'entities');
  
  if (await fs.pathExists(facadePath)) {
    const facadeFiles = await fs.readdir(facadePath);
    
    for (const facadeFile of facadeFiles) {
      if (facadeFile.endsWith('-facade.ts') && !facadeFile.startsWith('injection-')) {
        const entityName = facadeFile.replace('-facade.ts', '');
        const alreadyExists = entities.some(e => e.name.toLowerCase() === entityName.toLowerCase());
        if (!alreadyExists) {
          const entityPaths = await getEntityAllPaths(basePath, apiName, entityName);
          entities.push({
            name: entityName,
            apiName: apiName,
            paths: entityPaths
          });
        }
      }
    }
  }
}

/**
 * Detecta todas las APIs generadas
 */
export async function detectGeneratedAPIs(basePath: string): Promise<DetectedAPI[]> {
  const apis: DetectedAPI[] = [];
  
  try {
    if (!await fs.pathExists(basePath)) {
      return apis;
    }
    
    const apiDirs = await fs.readdir(basePath);
    
    for (const apiDir of apiDirs) {
      const apiPath = path.join(basePath, apiDir);
      const stat = await fs.stat(apiPath);
      
      if (stat.isDirectory()) {
        // Verificar que es una API válida (tiene estructura domain/infrastructure/facade)
        const domainPath = path.join(apiPath, 'domain');
        const infraPath = path.join(apiPath, 'infrastructure');
        const facadePath = path.join(apiPath, 'facade');
        
        if (await fs.pathExists(domainPath) && 
            await fs.pathExists(infraPath) && 
            await fs.pathExists(facadePath)) {
          
          // Contar entidades
          const entities = await getApiEntities(basePath, apiDir);
          const totalFiles = await countApiFiles(apiPath);
          
          apis.push({
            name: apiDir,
            entities: entities,
            totalFiles: totalFiles
          });
        }
      }
    }
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Error detectando APIs: ${error}`));
  }
  
  return apis;
}

/**
 * Obtiene todas las rutas de archivos de una entidad específica
 */
async function getEntityAllPaths(basePath: string, apiName: string, entityName: string): Promise<string[]> {
  const paths: string[] = [];
  const entityNameLower = entityName.toLowerCase();
  // Convertir CamelCase a kebab-case correctamente
  const entityNameKebab = entityName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  
  // Detectar si estamos en test-output o proyecto real
  const isTestOutput = basePath.includes('test-output');
  
  let baseStructure: any;
  
  if (isTestOutput) {
    // Estructura para test-output (como antes)
    baseStructure = {
      domainModels: path.join(basePath, apiName, 'domain/models/apis', apiName, 'entities', entityNameLower),
      domainRepository: path.join(basePath, apiName, 'domain/services/repositories/apis', apiName, 'entities'),
      domainUseCases: path.join(basePath, apiName, 'domain/services/use_cases/apis', apiName, 'entities', entityNameLower),
      infraEntities: path.join(basePath, apiName, 'infrastructure/entities/apis', apiName, 'entities', entityNameLower),
      infraMappers: path.join(basePath, apiName, 'infrastructure/mappers/apis', apiName, 'entities', entityNameLower),
      infraRepository: path.join(basePath, apiName, 'infrastructure/repositories/apis', apiName, 'repositories/entities', entityNameLower),
      facade: path.join(basePath, apiName, 'facade/apis', apiName, 'entities'),
      useCaseInjection: path.join(basePath, apiName, 'domain/services/use_cases/apis', apiName, 'injection/entities'),
      mapperInjection: path.join(basePath, apiName, 'infrastructure/mappers/apis', apiName, 'injection/entities'),
      repositoryInjection: path.join(basePath, apiName, 'infrastructure/repositories/apis', apiName, 'repositories/injection/entities'),
      facadeInjection: path.join(basePath, apiName, 'facade/apis', apiName, 'injection/entities')
    };
  } else {
    // Estructura para proyecto real - basePath ya es /bus
    baseStructure = {
      domainModels: path.join(basePath, 'domain/models/apis', apiName, 'entities', entityNameLower),
      domainRepository: path.join(basePath, 'domain/services/repositories/apis', apiName, 'entities'),
      domainUseCases: path.join(basePath, 'domain/services/use_cases/apis', apiName, 'entities', entityNameLower),
      infraEntities: path.join(basePath, 'infrastructure/entities/apis', apiName, 'entities', entityNameLower),
      infraMappers: path.join(basePath, 'infrastructure/mappers/apis', apiName, 'entities', entityNameLower),
      infraRepository: path.join(basePath, 'infrastructure/repositories/apis', apiName, 'repositories/entities', entityNameLower),
      facade: path.join(basePath, 'facade/apis', apiName, 'entities'),
      useCaseInjection: path.join(basePath, 'domain/services/use_cases/apis', apiName, 'injection/entities'),
      mapperInjection: path.join(basePath, 'infrastructure/mappers/apis', apiName, 'injection/entities'),
      repositoryInjection: path.join(basePath, 'infrastructure/repositories/apis', apiName, 'repositories/injection/entities'),
      facadeInjection: path.join(basePath, 'facade/apis', apiName, 'injection/entities')
    };
  }
  
  // Archivos específicos de entidad
  const entityFiles = [
    // DTOs
    path.join(baseStructure.domainModels, `i-${entityNameKebab}-dto.ts`),
    path.join(baseStructure.domainModels, `i-${entityNameKebab}-save-dto.ts`),
    path.join(baseStructure.domainModels, `i-${entityNameKebab}-read-dto.ts`),
    path.join(baseStructure.domainModels, `i-${entityNameKebab}-update-dto.ts`),
    path.join(baseStructure.domainModels, `i-${entityNameKebab}-delete-dto.ts`),
    path.join(baseStructure.domainModels, 'index.ts'),
    
    // Repository Interface
    path.join(baseStructure.domainRepository, `i-${entityNameKebab}-repository.ts`),
    
    // Use Cases
    path.join(baseStructure.domainUseCases, `${entityNameKebab}-save-use-case.ts`),
    path.join(baseStructure.domainUseCases, `${entityNameKebab}-read-use-case.ts`),
    path.join(baseStructure.domainUseCases, `${entityNameKebab}-update-use-case.ts`),
    path.join(baseStructure.domainUseCases, `${entityNameKebab}-delete-use-case.ts`),
    path.join(baseStructure.domainUseCases, `${entityNameKebab}-list-use-case.ts`),
    
    // Entities
    path.join(baseStructure.infraEntities, `i-${entityNameKebab}-entity.ts`),
    path.join(baseStructure.infraEntities, `i-${entityNameKebab}-save-entity.ts`),
    path.join(baseStructure.infraEntities, `i-${entityNameKebab}-read-entity.ts`),
    path.join(baseStructure.infraEntities, `i-${entityNameKebab}-update-entity.ts`),
    path.join(baseStructure.infraEntities, `i-${entityNameKebab}-delete-entity.ts`),
    path.join(baseStructure.infraEntities, 'index.ts'),
    
    // Mappers
    path.join(baseStructure.infraMappers, `${entityNameKebab}-entity-mapper.ts`),
    path.join(baseStructure.infraMappers, `${entityNameKebab}-save-mapper.ts`),
    path.join(baseStructure.infraMappers, `${entityNameKebab}-read-mapper.ts`),
    path.join(baseStructure.infraMappers, `${entityNameKebab}-update-mapper.ts`),
    path.join(baseStructure.infraMappers, `${entityNameKebab}-delete-mapper.ts`),
    
    // Repository
    path.join(baseStructure.infraRepository, `${entityNameKebab}-repository.ts`),
    
    // Facade
    path.join(baseStructure.facade, `${entityNameKebab}-facade.ts`),
    
    // Injection files (usar entityNameLower para injection files)
    path.join(baseStructure.useCaseInjection, `injection-${apiName}-entities-${entityNameLower}-use-case.ts`),
    path.join(baseStructure.mapperInjection, `injection-${apiName}-entities-${entityNameLower}-mapper.ts`)
  ];
  
  // Verificar qué archivos existen realmente
  for (const filePath of entityFiles) {
    if (await fs.pathExists(filePath)) {
      paths.push(filePath);
    }
  }
  
  // Agregar directorios completos de la entidad
  const entityDirectories = [
    baseStructure.domainModels,
    baseStructure.domainUseCases,
    baseStructure.infraEntities,
    baseStructure.infraMappers,
    baseStructure.infraRepository
  ];
  
  for (const dirPath of entityDirectories) {
    if (await fs.pathExists(dirPath)) {
      paths.push(dirPath);
    }
  }
  
  // Agregar directorios vacíos que se pueden eliminar
  for (const dirPath of Object.values(baseStructure) as string[]) {
    if (await fs.pathExists(dirPath)) {
      try {
        const files = await fs.readdir(dirPath);
        if (files.length === 0) {
          paths.push(dirPath);
        }
      } catch (error) {
        // Ignorar errores de lectura de directorio
      }
    }
  }
  
  return paths;
}

/**
 * Obtiene las entidades de una API
 */
async function getApiEntities(basePath: string, apiName: string): Promise<string[]> {
  const entities: string[] = [];
  
  try {
    const entitiesPath = path.join(basePath, apiName, 'domain/models/apis', apiName, 'entities');
    
    if (await fs.pathExists(entitiesPath)) {
      const entityDirs = await fs.readdir(entitiesPath);
      
      for (const entityDir of entityDirs) {
        const entityPath = path.join(entitiesPath, entityDir);
        const stat = await fs.stat(entityPath);
        
        if (stat.isDirectory()) {
          entities.push(entityDir);
        }
      }
    }
  } catch (error) {
    // Ignorar errores
  }
  
  return entities;
}

/**
 * Cuenta todos los archivos de una API
 */
async function countApiFiles(apiPath: string): Promise<number> {
  let count = 0;
  
  try {
    const files = await getAllFiles(apiPath);
    count = files.length;
  } catch (error) {
    // Ignorar errores
  }
  
  return count;
}

/**
 * Obtiene todos los archivos de un directorio recursivamente
 */
async function getAllFiles(dirPath: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const items = await fs.readdir(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isFile()) {
        files.push(itemPath);
      } else if (stat.isDirectory()) {
        const subFiles = await getAllFiles(itemPath);
        files.push(...subFiles);
      }
    }
  } catch (error) {
    // Ignorar errores
  }
  
  return files;
}

/**
 * Elimina una entidad específica
 */
export async function cleanupEntity(basePath: string, apiName: string, entityName: string): Promise<void> {
  console.log(chalk.blue(`\n🧹 Eliminando entidad "${entityName}" de la API "${apiName}"...`));
  
  try {
    const entityPaths = await getEntityAllPaths(basePath, apiName, entityName);
    let deletedCount = 0;
    
    // Separar archivos y directorios para eliminar archivos primero
    const files: string[] = [];
    const directories: string[] = [];
    
    for (const filePath of entityPaths) {
      if (await fs.pathExists(filePath)) {
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          files.push(filePath);
        } else if (stat.isDirectory()) {
          directories.push(filePath);
        }
      }
    }
    
    // Eliminar archivos primero
    for (const filePath of files) {
      await fs.remove(filePath);
      console.log(chalk.gray(`🗑️  Archivo eliminado: ${path.relative(basePath, filePath)}`));
      deletedCount++;
    }
    
    // Luego eliminar directorios (de más específico a más general)
    const sortedDirs = directories.sort((a, b) => b.length - a.length);
    for (const dirPath of sortedDirs) {
      if (await fs.pathExists(dirPath)) {
        try {
          await fs.remove(dirPath);
          console.log(chalk.gray(`📁 Directorio eliminado: ${path.relative(basePath, dirPath)}`));
          deletedCount++;
        } catch (error) {
          // Si el directorio no está vacío, no es un error crítico
          console.log(chalk.yellow(`⚠️  Directorio no vacío: ${path.relative(basePath, dirPath)}`));
        }
      }
    }
    
    // Limpiar referencias en archivos de injection
    await cleanupInjectionReferences(basePath, apiName, entityName);
    
    console.log(chalk.green(`✅ Entidad "${entityName}" eliminada exitosamente (${deletedCount} elementos)`));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error eliminando entidad "${entityName}":`, error));
    throw error;
  }
}

/**
 * Elimina una API completa
 */
export async function cleanupAPI(basePath: string, apiName: string): Promise<void> {
  console.log(chalk.blue(`\n🧹 Eliminando API completa "${apiName}"...`));
  
  try {
    const apiPath = path.join(basePath, apiName);
    
    if (await fs.pathExists(apiPath)) {
      const files = await getAllFiles(apiPath);
      await fs.remove(apiPath);
      
      console.log(chalk.green(`✅ API "${apiName}" eliminada exitosamente (${files.length} archivos)`));
    } else {
      console.log(chalk.yellow(`⚠️  La API "${apiName}" no existe`));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error eliminando API "${apiName}":`, error));
    throw error;
  }
}

/**
 * Elimina todo el contenido generado
 */
export async function cleanupAll(basePath: string): Promise<void> {
  console.log(chalk.blue(`\n🧹 Eliminando todo el contenido generado...`));
  
  try {
    if (await fs.pathExists(basePath)) {
      const files = await getAllFiles(basePath);
      await fs.remove(basePath);
      await fs.ensureDir(basePath); // Recrear directorio vacío
      
      console.log(chalk.green(`✅ Todo el contenido eliminado exitosamente (${files.length} archivos)`));
    } else {
      console.log(chalk.yellow(`⚠️  El directorio "${basePath}" no existe`));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error eliminando contenido:`, error));
    throw error;
  }
}

/**
 * Limpia referencias de entidad en archivos de injection
 */
async function cleanupInjectionReferences(basePath: string, apiName: string, entityName: string): Promise<void> {
  const entityNameLower = entityName.toLowerCase();
  const entityNameKebab = entityName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const entityNamePascal = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  
  // Detectar si estamos en test-output o proyecto real
  const isTestOutput = basePath.includes('test-output');
  
  let injectionFiles: string[];
  
  if (isTestOutput) {
    // Estructura para test-output
    injectionFiles = [
      path.join(basePath, apiName, 'infrastructure/repositories/apis', apiName, 'repositories/injection/entities/injection-' + apiName + '-entities-repository.ts'),
      path.join(basePath, apiName, 'facade/apis', apiName, 'injection/entities/injection-' + apiName + '-entities-facade.ts')
    ];
  } else {
    // Estructura para proyecto real - basePath ya es /bus
    injectionFiles = [
      path.join(basePath, 'infrastructure/repositories/apis', apiName, 'repositories/injection/entities/injection-' + apiName + '-entities-repository.ts'),
      path.join(basePath, 'facade/apis', apiName, 'injection/entities/injection-' + apiName + '-entities-facade.ts'),
      // Agregar archivos específicos de la entidad que deben eliminarse completamente
      path.join(basePath, 'domain/services/use_cases/apis', apiName, 'injection/entities/injection-' + apiName + '-entities-' + entityNameLower + '-use-case.ts'),
      path.join(basePath, 'infrastructure/mappers/apis', apiName, 'injection/entities/injection-' + apiName + '-entities-' + entityNameLower + '-mapper.ts')
    ];
  }
  
  for (const injectionFile of injectionFiles) {
    if (await fs.pathExists(injectionFile)) {
      try {
        // Si es un archivo específico de la entidad (contiene el nombre de la entidad), eliminarlo completamente
        if (injectionFile.includes(`-${entityNameLower}-`)) {
          await fs.remove(injectionFile);
          console.log(chalk.gray(`🗑️  Archivo de injection eliminado: ${path.relative(basePath, injectionFile)}`));
        } else {
          // Si es un archivo compartido, solo limpiar referencias
          let content = await fs.readFile(injectionFile, 'utf-8');
          
          // Remover import de la entidad
          const importRegex = new RegExp(`import\\s*{[^}]*${entityNamePascal}[^}]*}\\s*from[^;]+;\\s*\n?`, 'g');
          content = content.replace(importRegex, '');
          
          // Remover método estático de la entidad
          const methodRegex = new RegExp(`\\s*public\\s+static\\s+${entityNamePascal}[^}]+}\\s*\n?`, 'g');
          content = content.replace(methodRegex, '');
          
          await fs.writeFile(injectionFile, content);
          console.log(chalk.gray(`🧹 Referencias eliminadas de: ${path.relative(basePath, injectionFile)}`));
        }
        
      } catch (error) {
        console.warn(chalk.yellow(`⚠️  Error limpiando referencias en ${injectionFile}: ${error}`));
      }
    }
  }
}
