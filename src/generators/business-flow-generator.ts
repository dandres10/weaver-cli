import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { EntitySchema } from '../parsers/swagger-parser';

// Ruta base donde se ejecutará el comando
const DEFAULT_BASE_PATH = process.cwd(); // Directorio actual por defecto
const LOCAL_TEST_PATH = './test-output';

export async function createBusinessFlow(serviceName: string, basePath: string = DEFAULT_BASE_PATH, schema?: EntitySchema | null, targetApiName: string = 'platform'): Promise<void> {
  console.log(chalk.blue(`📁 Generando flujo de negocio completo para ${serviceName} en: ${basePath}`));

  const serviceNameLower = serviceName.toLowerCase();
  const apiPrefix = '';

  const paths = {
    // DTOs para business
    domainModels: path.join(basePath, `${apiPrefix}domain/models/apis/${targetApiName}/business/${serviceNameLower}`),
    // Repositories para business
    domainRepositories: path.join(basePath, `${apiPrefix}domain/services/repositories/apis/${targetApiName}/business`),
    // Use Cases para business
    domainUseCases: path.join(basePath, `${apiPrefix}domain/services/use_cases/apis/${targetApiName}/business/${serviceNameLower}`),
    // Entities para business
    infraEntities: path.join(basePath, `${apiPrefix}infrastructure/entities/apis/${targetApiName}/business/${serviceNameLower}`),
    // Mappers para business
    infraMappers: path.join(basePath, `${apiPrefix}infrastructure/mappers/apis/${targetApiName}/business/${serviceNameLower}`),
    // Injection para mappers de business (ubicación correcta)
    injectionMappers: path.join(basePath, `${apiPrefix}infrastructure/mappers/apis/${targetApiName}/injection/business/${serviceNameLower}`),
    // Facades para business
    facades: path.join(basePath, `${apiPrefix}facade/apis/${targetApiName}/business`),
    // Injection para business Use Cases
    injectionUseCases: path.join(basePath, `${apiPrefix}domain/services/use_cases/apis/${targetApiName}/injection/business`),
    // Injection para business Facades
    injectionFacades: path.join(basePath, `${apiPrefix}facade/apis/${targetApiName}/injection/business`),
    // Infrastructure repositories para business
    infraRepositories: path.join(basePath, `${apiPrefix}infrastructure/repositories/apis/${targetApiName}/repositories/business/${serviceNameLower}`),
    // Injection para infrastructure repositories de business
    injectionRepositories: path.join(basePath, `${apiPrefix}infrastructure/repositories/apis/${targetApiName}/repositories/injection/business`)
  };

  try {
    // Crear directorios necesarios
    await createDirectoriesIfNotExists(paths);
    // Generar DTOs por operación
    await generateDomainDTOs(serviceName, paths, schema, targetApiName);
    // Generar repository interfaces por servicio
    await generateDomainRepositoryInterfaces(serviceName, paths, schema, targetApiName);
    // Generar use cases por operación
    await generateDomainUseCases(serviceName, paths, schema, targetApiName);
    // Generar entities por operación
    await generateInfrastructureEntities(serviceName, paths, schema, targetApiName);
    // Generar mappers por operación
    await generateInfrastructureMappers(serviceName, paths, schema, targetApiName);
    // Generar injection files por operación (en lugar de por servicio)
    await generateMapperInjectionPerOperation(serviceName, paths, schema, targetApiName);
    // Generar repositories de implementación por operación
    await generateInfrastructureRepositories(serviceName, paths, schema, targetApiName);
    // Generar injection para infrastructure repositories
    await generateRepositoryInjectionFiles(serviceName, paths, schema, targetApiName);
    // Generar facades por servicio
    await generateBusinessFacades(serviceName, paths, schema, targetApiName);
    // Generar archivos de inyección
    await generateBusinessInjectionFiles(serviceName, paths, schema, targetApiName);
    console.log(chalk.green(`✨ Flujo de negocio ${serviceName} generado exitosamente!`));
  } catch (error) {
    console.error(chalk.red('❌ Error generando archivos:'), error);
    throw error;
  }
}

async function generateInfrastructureEntities(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio (nunca legacy)
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationFolder = path.join(paths.infraEntities, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request Entity ---
      if (operation.fields && operation.fields.length > 0) {
        const requestInterface = generateBusinessEntityInterface(serviceName, operation, 'request');
        const requestFileName = `i-${serviceName.toLowerCase()}-${operationName}-request-entity.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestInterface
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestEntity`;
        exportStatements.push(`export { ${requestInterfaceName} } from './${operationName}/${requestFileName.replace('.ts', '')}';`);
        await generateNestedEntitiesForOperation(serviceName, operation, 'request', operationFolder, apiName, exportStatements, operationName);
      }

      // --- Response Entity ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseInterface = generateBusinessEntityInterface(serviceName, operation, 'response');
        const responseFileName = `i-${serviceName.toLowerCase()}-${operationName}-response-entity.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseInterface
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseEntity`;
        exportStatements.push(`export { ${responseInterfaceName} } from './${operationName}/${responseFileName.replace('.ts', '')}';`);
        await generateNestedEntitiesForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
      }
    }
    // Generar index.ts con export type (simplificado y mejor práctica)
    const uniqueExports = new Set<string>();
    const finalExports: string[] = [];
    
    exportStatements.forEach(statement => {
      // Extraer el nombre de la interface del export
      const match = statement.match(/export \{ (\w+) \}/);
      if (match) {
        const interfaceName = match[1];
        
        if (!uniqueExports.has(interfaceName)) {
          uniqueExports.add(interfaceName);
          // Convertir todos a export type (mejor práctica para interfaces)
          const typeStatement = statement.replace('export {', 'export type {');
          finalExports.push(typeStatement);
        }
      }
    });
    
    const indexContent = finalExports.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.infraEntities, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index Entity: index.ts`));
  } else {
    // Si no hay operaciones de negocio, NO generar nada (nunca legacy)
    console.log(chalk.yellow('⚠️  No se generaron entities porque no hay operaciones de negocio detectadas.'));
    // Eliminar archivos legacy si existen
    const legacyFiles = [
      `i-${serviceName.toLowerCase()}-entity.ts`,
      `i-${serviceName.toLowerCase()}-save-entity.ts`,
      `i-${serviceName.toLowerCase()}-read-entity.ts`,
      `i-${serviceName.toLowerCase()}-update-entity.ts`,
      `i-${serviceName.toLowerCase()}-delete-entity.ts`,
      'index.ts'
    ];
    for (const file of legacyFiles) {
      const filePath = path.join(paths.infraEntities, file);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }
    }
  }
}

async function generateInfrastructureMappers(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationFolder = path.join(paths.infraMappers, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request Mapper ---
      if (operation.fields && operation.fields.length > 0) {
        const requestMapper = generateBusinessMapper(serviceName, operation, 'request', apiName);
        const requestFileName = `${serviceName.toLowerCase()}-${operationName}-request-mapper.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestMapper
        );
        
        // Generar mappers para interfaces anidadas del request
        await generateNestedMappersForOperation(serviceName, operation, 'request', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestMapperName = `${toPascalCase(serviceName)}${cleanOperationName}RequestMapper`;
        exportStatements.push(`export { ${requestMapperName} } from './${operationName}/${serviceName.toLowerCase()}-${operationName}-request-mapper';`);
      }

      // --- Response Mapper ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseMapper = generateBusinessMapper(serviceName, operation, 'response', apiName);
        const responseFileName = `${serviceName.toLowerCase()}-${operationName}-response-mapper.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseMapper
        );
        
        // Generar mappers para interfaces anidadas
        await generateNestedMappersForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseMapperName = `${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper`;
        exportStatements.push(`export { ${responseMapperName} } from './${operationName}/${serviceName.toLowerCase()}-${operationName}-response-mapper';`);
      }
    }
    
    // Generar index.ts para mappers
    const indexContent = exportStatements.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.infraMappers, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index Mapper: index.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron mappers porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateDomainDTOs(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationFolder = path.join(paths.domainModels, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request DTO ---
      if (operation.fields && operation.fields.length > 0) {
        const requestDTO = generateBusinessDTO(serviceName, operation, 'request', apiName);
        const requestFileName = `i-${serviceName.toLowerCase()}-${operationName}-request-dto.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestDTO
        );
        
        // Generar DTOs para interfaces anidadas de request
        await generateNestedDTOsForOperation(serviceName, operation, 'request', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        exportStatements.push(`export { ${requestDTOName} } from './${operationName}/${requestFileName.replace('.ts', '')}';`);
      }

      // --- Response DTO ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseDTO = generateBusinessDTO(serviceName, operation, 'response', apiName);
        const responseFileName = `i-${serviceName.toLowerCase()}-${operationName}-response-dto.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseDTO
        );
        
        // Generar DTOs para interfaces anidadas con patrón correcto
        await generateNestedDTOsForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const baseResponseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const responseDTOName = operation.isResponseArray ? `${baseResponseDTOName}[]` : baseResponseDTOName;
        exportStatements.push(`export { ${baseResponseDTOName} } from './${operationName}/${responseFileName.replace('.ts', '')}';`);
      }
    }
    
    // Generar index.ts para DTOs con export type (simplificado y mejor práctica)
    const uniqueExports = new Set<string>();
    const finalExports: string[] = [];
    
    exportStatements.forEach(statement => {
      // Extraer el nombre de la interface del export
      const match = statement.match(/export \{ (\w+) \}/);
      if (match) {
        const interfaceName = match[1];
        
        if (!uniqueExports.has(interfaceName)) {
          uniqueExports.add(interfaceName);
          // Convertir todos a export type (mejor práctica para interfaces)
          const typeStatement = statement.replace('export {', 'export type {');
          finalExports.push(typeStatement);
        }
      }
    });
    
    const indexContent = finalExports.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.domainModels, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index DTO: index.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron DTOs porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateNestedMappersForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    // Solo generar mappers para interfaces, NO para enums (los enums se mapean directamente)
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !field.isEnum && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Generar mapper individual para cada interface anidada
      const nestedMapper = generateIndividualNestedMapper(field.type, field, apiName, serviceName, operationName, type);
      
      // Aplicar el patrón correcto: <flujo>-<proceso>-<tipo>-<request/response>-mapper.ts
      const serviceNameKebab = serviceName.toLowerCase();
      const operationKebab = operationName.replace(/_/g, '-');
      
      // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response 
      // pero preservando Response/Request cuando es la operación actual
      let cleanType = field.type;
      const currentOperationClean = operationName.replace(/_/g, '').toLowerCase();
      
      // Solo remover "Login" si no estamos en la operación login
      if (currentOperationClean !== 'login') {
        cleanType = cleanType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> CompanyResponse
        cleanType = cleanType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> CompanyRequest  
        cleanType = cleanType.replace(/Login$/, '');          // CompanyLogin -> Company
      }
      
      // Solo remover Response/Request si el tipo ya los incluye redundantemente
      if (type === 'response' && cleanType.endsWith('Response')) {
        // No hacer nada - mantener Response
      } else if (type === 'request' && cleanType.endsWith('Request')) {
        // No hacer nada - mantener Request
      } else {
        // Remover sufijos generales solo si no coinciden con el tipo actual
        cleanType = cleanType.replace(/Response$/, '');       
        cleanType = cleanType.replace(/Request$/, '');        
      }
      
      let typeKebab = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      const fileSuffix = type === 'request' ? 'request' : 'response';
      
      // Detectar y evitar duplicación de operaciones en el nombre del tipo para archivos
      const operationInFileName = operationKebab.toLowerCase();
      if (typeKebab.includes(operationInFileName)) {
        // Eliminar la operación del tipo: user-login-response -> user-response
        typeKebab = typeKebab.replace(new RegExp(`-${operationInFileName}`, 'gi'), '');
      }
      
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `${serviceNameKebab}-${operationKebab}-${typeKebab}-${fileSuffix}-mapper.ts`
        : `${serviceNameKebab}-${operationKebab}-${typeKebab}-mapper.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedMapper
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const formattedServiceName = toPascalCase(serviceName);
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      const classSuffix = type === 'request' ? 'Request' : 'Response';
      
      // Aplicar la misma lógica de limpieza contextual que en generateIndividualNestedMapper
      let finalFieldType = formattedFieldType;
      const currentOperationCleanForExport = operationName.replace(/_/g, '').toLowerCase();
      
      // Solo remover "Login" si no estamos en la operación login
      if (currentOperationCleanForExport !== 'login') {
        finalFieldType = finalFieldType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> CompanyResponse
        finalFieldType = finalFieldType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> CompanyRequest  
        finalFieldType = finalFieldType.replace(/Login$/, '');          // CompanyLogin -> Company
      }
      
      // Solo remover Response/Request si el tipo ya los incluye redundantemente
      if (type === 'response' && finalFieldType.endsWith('Response')) {
        // No hacer nada - mantener Response
      } else if (type === 'request' && finalFieldType.endsWith('Request')) {
        // No hacer nada - mantener Request
      } else {
        // Remover sufijos generales solo si no coinciden con el tipo actual
        finalFieldType = finalFieldType.replace(/Response$/, '');       
        finalFieldType = finalFieldType.replace(/Request$/, '');        
      }
      
      // Detectar y evitar duplicación de operaciones en el nombre del tipo
      const operationInTypeName = cleanOperationName.toLowerCase();
      const typeNameLower = finalFieldType.toLowerCase();
      
      // Si el tipo incluye el nombre de la operación, removerlo para evitar duplicación
      if (typeNameLower.includes(operationInTypeName)) {
        finalFieldType = finalFieldType.replace(new RegExp(cleanOperationName, 'gi'), '');
      }
      
      // Determinar si necesita sufijo después de la limpieza
      const finalNeedsSuffix = !finalFieldType.endsWith('Response') && !finalFieldType.endsWith('Request');
      
      // Generar nombre con patrón correcto: <Flujo><Proceso><Tipo><Request/Response>Mapper
      const mapperClassName = finalNeedsSuffix 
        ? `${formattedServiceName}${cleanOperationName}${finalFieldType}${classSuffix}Mapper`
        : `${formattedServiceName}${cleanOperationName}${finalFieldType}Mapper`;
      exportStatements.push(`export { ${mapperClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

async function createDirectoriesIfNotExists(paths: any): Promise<void> {
  for (const [key, dir] of Object.entries(paths)) {
    if (typeof dir === 'string') {
      console.log(chalk.cyan(`📂 Directorio creado/verificado: ${dir}`));
      await fs.ensureDir(dir);
    }
  }
}

// Funciones auxiliares copiadas del generador original
function getDefaultFields(): any[] {
  return [
    { name: 'name', type: 'string', required: true },
    { name: 'state', type: 'boolean', required: false }
  ];
}

function toPascalCase(str: string): string {
  return str
    .replace(/[\[\]]/g, 'Array')  // ← Fix: Convert brackets to 'Array' before PascalCase conversion
    .replace(/(^|_|-)(\w)/g, (_: string, __: string, c: string) => c ? c.toUpperCase() : '')
    .replace(/Dto$/i, 'Entity')
    .replace(/EntityEntity$/, 'Entity');
}

function toScreamingSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toLowerCase();
}

function generateBusinessEntityInterface(serviceName: string, operation: any, type: 'request' | 'response'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const interfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Entity`;
  
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  let imports: string[] = [];
  let content = '';
  
  if (fields && fields.length > 0) {
    fields.forEach((field: any) => {
      const optionalMark = field.required ? '' : '?';
      const arrayMark = field.isArray ? '[]' : '';
      // Mantener los nombres de campos tal como vienen del swagger (snake_case)
      const fieldName = field.name;
      let fieldType = field.type;
      
      if (fieldType && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(fieldType)) {
        const typeName = toPascalCase(fieldType);
        const suffix = type === 'request' ? 'Request' : 'Response';
        // Usar patrón completo: I<Flujo><Proceso><Tipo><Request/Response>Entity
        // Limpiar el tipo para obtener solo el nombre base sin sufijos
        let cleanTypeName = typeName;
        cleanTypeName = cleanTypeName.replace(/LoginResponse$/, '');
        cleanTypeName = cleanTypeName.replace(/LoginRequest$/, '');
        cleanTypeName = cleanTypeName.replace(/Login$/, '');
        cleanTypeName = cleanTypeName.replace(/Response$/, '');
        cleanTypeName = cleanTypeName.replace(/Request$/, '');
        
        // Limpiar corchetes para nombres de interfaces
        cleanTypeName = cleanTypeName.replace(/[\[\]]/g, 'Array');
        
        fieldType = `I${toPascalCase(serviceName)}${cleanOperationName}${cleanTypeName}${suffix}Entity`;
        
        // Generar nombre de archivo con patrón correcto: i-<flujo>-<proceso>-<tipo>-<request/response>-entity
        // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response
        let cleanType = field.type;
        // Remover múltiples sufijos en orden específico
        cleanType = cleanType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> Company
        cleanType = cleanType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> Company  
        cleanType = cleanType.replace(/Login$/, '');          // CompanyLogin -> Company
        cleanType = cleanType.replace(/Response$/, '');       // CompanyResponse -> Company
        cleanType = cleanType.replace(/Request$/, '');        // CompanyRequest -> Company
        
        const baseFileName = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
        const operationKebab = operationName.replace(/_/g, '-');
        const importFileName = `i-${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-entity`;
        
        imports.push(`import { ${fieldType} } from "./${importFileName}";`);
      }
      
      content += `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};\n`;
    });
  } else {
    content += `  // Define los campos del ${type} aquí\n`;
  }
  
  const importsSection = imports.length > 0 ? imports.join('\n') + '\n\n' : '';
  
  return `${importsSection}export interface ${interfaceName} {
${content}}`;
}

function convertToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function getFieldOptionalStatus(field: any, type: string): boolean {
  if (type === 'save') {
    return !field.required;
  }
  if (type === 'update') {
    return true; // En update, todos los campos son opcionales excepto ID
  }
  return !field.required;
}

function getTypeScriptType(field: any): string {
  switch (field.type) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return 'any[]';
    case 'object':
      return 'any';
    default:
      return 'string';
  }
}

function generateBusinessMapper(serviceName: string, operation: any, type: 'request' | 'response', apiName: string = 'platform'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const serviceNameLower = serviceName.toLowerCase();
  const dtoInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}DTO`;
  const entityInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Entity`;
  const mapperClassName = `${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Mapper`;
  
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  
  // Generar campos para mapFrom (Entity -> DTO)
  let mapFromFields = '';
  // Generar campos para mapTo (DTO -> Entity)  
  let mapToFields = '';
  // Agregar imports e instancias de mappers anidados
  let nestedMapperImports = '';
  let nestedMapperInstances = '';
  
  if (fields && fields.length > 0) {
    const nestedMappers: string[] = [];
    const nestedMapperReferences: { [key: string]: string } = {}; // Para evitar duplicados
    
    const mapFromMappings = fields.map((field: any) => {
      const dtoFieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const entityFieldName = field.name; // Entity usa nombres del swagger (snake_case)
      
      // Si es un tipo complejo, usar mapper específico
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const formattedFieldType = toPascalCase(field.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        const mapperClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
          ? `${formattedFieldType}Mapper` 
          : `${formattedFieldType}${suffix}Mapper`;
        
        // Crear un nombre de variable único sin duplicaciones usando camelCase correcto
        const cleanFieldType = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
          ? formattedFieldType.replace(/Response$|Request$/, '') 
          : formattedFieldType;
        const nestedMapperName = `${cleanFieldType.charAt(0).toLowerCase() + cleanFieldType.slice(1)}${suffix.charAt(0).toLowerCase() + suffix.slice(1)}Mapper`;
        
        // Generar nombre de método abreviado (sin prefijo de servicio y operación)
        const formattedServiceName = toPascalCase(serviceName);
        const methodName = mapperClassName.replace(new RegExp(`^${formattedServiceName}${cleanOperationName}`, ''), '');
        
        // Solo agregar si no existe ya
        if (!nestedMapperReferences[nestedMapperName]) {
          nestedMapperReferences[nestedMapperName] = mapperClassName;
          nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${methodName}()`);
        }
        
        if (field.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName} ?? [])`;
        } else {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFrom(param.${entityFieldName})`;
        }
      } else {
        return `            ${dtoFieldName}: param.${entityFieldName}`;
      }
    });
    
    const mapToMappings = fields.map((field: any) => {
      const dtoFieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const entityFieldName = field.name; // Entity usa nombres del swagger (snake_case)
      
      // Si es un tipo complejo, usar mapper específico
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const formattedFieldType = toPascalCase(field.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        const cleanFieldType = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
          ? formattedFieldType.replace(/Response$|Request$/, '') 
          : formattedFieldType;
        const nestedMapperName = `${cleanFieldType.charAt(0).toLowerCase() + cleanFieldType.slice(1)}${suffix.charAt(0).toLowerCase() + suffix.slice(1)}Mapper`;
        
        if (field.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName} ?? [])`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    // Agregar imports e instancias de mappers anidados si existen
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameLower}-${operationName.replace(/_/g, '-')}-mapper";\n`;
      nestedMapperInstances = nestedMappers.join('\n');
    }
    
    mapFromFields = mapFromMappings.join(',\n');
    mapToFields = mapToMappings.join(',\n');
  }

  return `import { Mapper } from "@bus/core/classes";
import { ${dtoInterfaceName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
import { ${entityInterfaceName} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}";
${nestedMapperImports}
export class ${mapperClassName} extends Mapper<${entityInterfaceName}, ${dtoInterfaceName}> {

    private static instance: ${mapperClassName};
${nestedMapperInstances}
    public constructor() { super(); }

    public static getInstance(): ${mapperClassName} {
        if (!${mapperClassName}.instance)
            ${mapperClassName}.instance = new ${mapperClassName}();
        return ${mapperClassName}.instance;
    }

    public mapFrom(param: ${entityInterfaceName}): ${dtoInterfaceName} {
        return {
${mapFromFields}
        }
    }

    public mapFromList(params: ${entityInterfaceName}[]): ${dtoInterfaceName}[] {
        return params.map((param: ${entityInterfaceName}) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ${dtoInterfaceName}): ${entityInterfaceName} {
        return {
${mapToFields}
        }
    }

    public mapToList(params: ${dtoInterfaceName}[]): ${entityInterfaceName}[] {
        return params.map((param: ${dtoInterfaceName}) => {
            return this.mapTo(param);
        })
    }
}`;
}

function generateIndividualNestedMapper(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  const serviceNameLower = serviceName.toLowerCase();
  const formattedTypeName = toPascalCase(typeName);
  const formattedServiceName = toPascalCase(serviceName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  
  // Crear cleanOperationName aquí también
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Aplicar el patrón correcto: <Flujo><Proceso><Tipo><Request/Response><DTO/Entity/Mapper>
  // Determinar si necesita sufijo basado en el tipo original
  const needsSuffix = !formattedTypeName.endsWith('Response') && !formattedTypeName.endsWith('Request');
  
  // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response 
  // pero preservando Response/Request cuando es la operación actual
  let cleanTypeName = formattedTypeName;
  const currentOperationClean = operationName.replace(/_/g, '').toLowerCase();
  
  // Solo remover "Login" si no estamos en la operación login
  if (currentOperationClean !== 'login') {
    cleanTypeName = cleanTypeName.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> CompanyResponse
    cleanTypeName = cleanTypeName.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> CompanyRequest  
    cleanTypeName = cleanTypeName.replace(/Login$/, '');          // CompanyLogin -> Company
  }
  
  // Solo remover Response/Request si el tipo ya los incluye redundantemente
  if (type === 'response' && cleanTypeName.endsWith('Response')) {
    // No hacer nada - mantener Response
  } else if (type === 'request' && cleanTypeName.endsWith('Request')) {
    // No hacer nada - mantener Request
  } else {
    // Remover sufijos generales solo si no coinciden con el tipo actual
    cleanTypeName = cleanTypeName.replace(/Response$/, '');       
    cleanTypeName = cleanTypeName.replace(/Request$/, '');        
  }
  
  // Limpiar corchetes para nombres de interfaces
  cleanTypeName = cleanTypeName.replace(/[\[\]]/g, 'Array');
  
  // Detectar y evitar duplicación de operaciones en el nombre del tipo
  // Ejemplo: UserRefreshToken -> User (cuando operationName es "refresh-token")
  const operationInTypeName = cleanOperationName.toLowerCase();
  const typeNameLower = cleanTypeName.toLowerCase();
  
  // Si el tipo incluye el nombre de la operación, removerlo para evitar duplicación
  if (typeNameLower.includes(operationInTypeName)) {
    // Eliminar la operación del tipo: UserRefreshToken -> User
    cleanTypeName = cleanTypeName.replace(new RegExp(cleanOperationName, 'gi'), '');
  }
  
  // Determinar si necesita sufijo después de la limpieza
  const finalNeedsSuffix = !cleanTypeName.endsWith('Response') && !cleanTypeName.endsWith('Request');
  
  const dtoInterfaceName = finalNeedsSuffix 
    ? `I${formattedServiceName}${cleanOperationName}${cleanTypeName}${suffix}DTO`
    : `I${formattedServiceName}${cleanOperationName}${cleanTypeName}DTO`;
  const entityInterfaceName = finalNeedsSuffix 
    ? `I${formattedServiceName}${cleanOperationName}${cleanTypeName}${suffix}Entity`
    : `I${formattedServiceName}${cleanOperationName}${cleanTypeName}Entity`;
  const mapperClassName = finalNeedsSuffix 
    ? `${formattedServiceName}${cleanOperationName}${cleanTypeName}${suffix}Mapper`
    : `${formattedServiceName}${cleanOperationName}${cleanTypeName}Mapper`;
  
  let mapFromFields = '';
  let mapToFields = '';
  let nestedMapperImports = '';
  let nestedMapperInstances = '';
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const nestedMappers: string[] = [];
    const nestedMapperReferences: { [key: string]: string } = {}; // Para evitar duplicados
    
    const mapFromMappings = field.nestedFields.map((nestedField: any) => {
      const dtoFieldName = convertToCamelCase(nestedField.name);
      const entityFieldName = nestedField.name;
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type) && !nestedField.isEnum) {
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        
        // Para mappers anidados, usar lógica simplificada más coherente con los archivos generados
        // Siempre remover sufijos duplicados y mantener solo el nombre base + sufijo correspondiente al tipo
        let cleanNestedFieldType = nestedFieldTypeName;
        
        // Remover sufijos redundantes para obtener nombre base limpio
        cleanNestedFieldType = cleanNestedFieldType.replace(/LoginResponse$|LoginRequest$|Response$|Request$/, '');
        
        // Generar nombre de clase de mapper basado en las clases reales que se generan
        const nestedMapperClassName = `${toPascalCase(serviceName)}${cleanOperationName}${cleanNestedFieldType}${nestedSuffix}Mapper`;
        
        // Crear un nombre de variable único sin duplicaciones usando camelCase correcto
        // Para la variable, extraer solo el nombre base sin sufijos y agregar ResponseMapper/RequestMapper
        let variableBaseName = nestedFieldTypeName;
        // Remover todos los sufijos para obtener el nombre base limpio
        variableBaseName = variableBaseName.replace(/LoginResponse$|LoginRequest$|Login$|Response$|Request$/, '');
        const nestedMapperName = `${variableBaseName.charAt(0).toLowerCase() + variableBaseName.slice(1)}${nestedSuffix.charAt(0).toLowerCase() + nestedSuffix.slice(1)}Mapper`;
        
        // Generar nombre de método abreviado (sin prefijo de servicio y operación)
        const formattedServiceName = toPascalCase(serviceName);
        const methodName = nestedMapperClassName.replace(new RegExp(`^${formattedServiceName}${cleanOperationName}`, ''), '');
        
        // Solo agregar si no existe ya
        if (!nestedMapperReferences[nestedMapperName]) {
          nestedMapperReferences[nestedMapperName] = nestedMapperClassName;
          nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${methodName}()`);
        }
        
        if (nestedField.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName} ?? [])`;
        } else {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFrom(param.${entityFieldName})`;
        }
      } else {
        return `            ${dtoFieldName}: param.${entityFieldName}`;
      }
    });
    
    const mapToMappings = field.nestedFields.map((nestedField: any) => {
      const dtoFieldName = convertToCamelCase(nestedField.name);
      const entityFieldName = nestedField.name;
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type) && !nestedField.isEnum) {
        // Usar el mismo nombre de variable que en mapFromMappings aplicando la misma lógica contextual
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        
        // Para mappers anidados, usar la misma lógica simplificada
        let cleanNestedFieldType = nestedFieldTypeName;
        
        // Remover sufijos redundantes para obtener nombre base limpio
        cleanNestedFieldType = cleanNestedFieldType.replace(/LoginResponse$|LoginRequest$|Response$|Request$/, '');
        
        // Para la variable, extraer solo el nombre base sin sufijos y agregar ResponseMapper/RequestMapper
        let variableBaseName = nestedFieldTypeName;
        // Remover todos los sufijos para obtener el nombre base limpio
        variableBaseName = variableBaseName.replace(/LoginResponse$|LoginRequest$|Login$|Response$|Request$/, '');
        const nestedMapperName = `${variableBaseName.charAt(0).toLowerCase() + variableBaseName.slice(1)}${nestedSuffix.charAt(0).toLowerCase() + nestedSuffix.slice(1)}Mapper`;
        
        if (nestedField.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName} ?? [])`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameLower}-${operationName.replace(/_/g, '-')}-mapper";\n`;
      nestedMapperInstances = nestedMappers.join('\n');
    }
    
    mapFromFields = mapFromMappings.join(',\n');
    mapToFields = mapToMappings.join(',\n');
  }

  return `import { Mapper } from "@bus/core/classes";
import { ${dtoInterfaceName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
import { ${entityInterfaceName} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}";
${nestedMapperImports}
export class ${mapperClassName} extends Mapper<${entityInterfaceName}, ${dtoInterfaceName}> {

    private static instance: ${mapperClassName};
${nestedMapperInstances}
    public constructor() { super(); }

    public static getInstance(): ${mapperClassName} {
        if (!${mapperClassName}.instance)
            ${mapperClassName}.instance = new ${mapperClassName}();
        return ${mapperClassName}.instance;
    }

    public mapFrom(param: ${entityInterfaceName}): ${dtoInterfaceName} {
        return {
${mapFromFields}
        }
    }

    public mapFromList(params: ${entityInterfaceName}[]): ${dtoInterfaceName}[] {
        return params.map((param: ${entityInterfaceName}) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ${dtoInterfaceName}): ${entityInterfaceName} {
        return {
${mapToFields}
        }
    }

    public mapToList(params: ${dtoInterfaceName}[]): ${entityInterfaceName}[] {
        return params.map((param: ${dtoInterfaceName}) => {
            return this.mapTo(param);
        })
    }
}`;
}
async function generateNestedDTOsForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      let nestedDTO;
      
      // Si es un enum, generar archivo de enum en lugar de interfaz
      if (field.isEnum && field.enumValues) {
        nestedDTO = generateIndividualEnum(field.type, field, apiName, serviceName, operationName, type);
      } else {
        // Generar DTO individual para cada interface anidada con patrón correcto
        nestedDTO = generateIndividualNestedDTO(field.type, field, apiName, serviceName, operationName, type);
      }
      
      // Patrón correcto: i-<flujo>-<proceso>-<tipo>-<request/response>-dto.ts
      // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response
      let cleanType = field.type;
      // Remover múltiples sufijos en orden específico
      cleanType = cleanType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> Company
      cleanType = cleanType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> Company  
      cleanType = cleanType.replace(/Login$/, '');          // CompanyLogin -> Company
      cleanType = cleanType.replace(/Response$/, '');       // CompanyResponse -> Company
      cleanType = cleanType.replace(/Request$/, '');        // CompanyRequest -> Company
      
      const baseFileName = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
      const operationKebab = operationName.replace(/_/g, '-');
      
      let nestedFileName;
      if (field.isEnum && field.enumValues) {
        // Para enums, usar el patrón: <flujo>-<proceso>-<tipo>-<request/response>-dto.ts
        nestedFileName = `${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-dto.ts`;
      } else {
        // Para interfaces, usar el patrón normal
        nestedFileName = `i-${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-dto.ts`;
      }
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedDTO
      );
      
      // Generar nombre de clase que coincida con el patrón del archivo
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      // Limpiar el tipo para obtener solo el nombre base
      let cleanFieldType = field.type;
      cleanFieldType = cleanFieldType.replace(/LoginResponse$/, '');
      cleanFieldType = cleanFieldType.replace(/LoginRequest$/, '');
      cleanFieldType = cleanFieldType.replace(/Login$/, '');
      cleanFieldType = cleanFieldType.replace(/Response$/, '');
      cleanFieldType = cleanFieldType.replace(/Request$/, '');
      
      const formattedFieldType = toPascalCase(cleanFieldType);
      
      let exportClassName;
      if (field.isEnum && field.enumValues) {
        // Para enums, usar el nombre del enum en SCREAMING_SNAKE_CASE (evitar duplicar "Enum")
        const enumSuffix = formattedFieldType.endsWith('Enum') ? '' : 'Enum';
        const pascalCaseName = `${toPascalCase(serviceName)}${cleanOperationName}${formattedFieldType}${enumSuffix}`;
        exportClassName = toScreamingSnakeCase(pascalCaseName);
      } else {
        // Para interfaces, usar el patrón normal
        const suffix = type === 'request' ? 'Request' : 'Response';
        exportClassName = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedFieldType}${suffix}DTO`;
      }
      
      // Export statement con el nombre correcto del archivo
      const fileNameForExport = nestedFileName.replace('.ts', '');
      exportStatements.push(`export { ${exportClassName} } from './${operationName}/${fileNameForExport}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

function generateBusinessDTO(serviceName: string, operation: any, type: 'request' | 'response', apiName: string = 'platform'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const dtoInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}DTO`;
  
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  
  let dtoFields = '';
  let imports: string[] = [];
  
  if (fields && fields.length > 0) {
    const fieldMappings = fields.map((field: any) => {
      const fieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const optionalMark = field.required ? '' : '?';
      const arrayMark = field.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo DTO
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const typeName = toPascalCase(field.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        // Usar patrón completo: I<Flujo><Proceso><Tipo><Request/Response>DTO
        // Limpiar el tipo para obtener solo el nombre base sin sufijos
        let cleanTypeName = typeName;
        cleanTypeName = cleanTypeName.replace(/LoginResponse$/, '');
        cleanTypeName = cleanTypeName.replace(/LoginRequest$/, '');
        cleanTypeName = cleanTypeName.replace(/Login$/, '');
        cleanTypeName = cleanTypeName.replace(/Response$/, '');
        cleanTypeName = cleanTypeName.replace(/Request$/, '');
        
        // Limpiar corchetes para nombres de interfaces
        cleanTypeName = cleanTypeName.replace(/[\[\]]/g, 'Array');
        
        const fieldType = `I${toPascalCase(serviceName)}${cleanOperationName}${cleanTypeName}${suffix}DTO`;
        
        // Generar nombre de archivo con patrón correcto: i-<flujo>-<proceso>-<tipo>-<request/response>-dto
        // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response
        let cleanType = field.type;
        // Remover múltiples sufijos en orden específico
        cleanType = cleanType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> Company
        cleanType = cleanType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> Company  
        cleanType = cleanType.replace(/Login$/, '');          // CompanyLogin -> Company
        cleanType = cleanType.replace(/Response$/, '');       // CompanyResponse -> Company
        cleanType = cleanType.replace(/Request$/, '');        // CompanyRequest -> Company
        
        const baseFileName = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
        const operationKebab = operationName.replace(/_/g, '-');
        const importFileName = `i-${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-dto`;
        
        imports.push(`import { ${fieldType} } from "./${importFileName}";`);
        
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${field.type}${arrayMark};`;
      }
    });
    
    dtoFields = fieldMappings.join('\n');
  }

  const importsSection = imports.length > 0 ? imports.join('\n') + '\n\n' : '';

  return `${importsSection}export interface ${dtoInterfaceName} {
${dtoFields}
}`;
}

function generateIndividualEnum(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  let cleanType = typeName;
  
  // Limpiar el tipo para obtener el nombre base
  cleanType = cleanType.replace(/LoginResponse$/, '');
  cleanType = cleanType.replace(/LoginRequest$/, '');
  cleanType = cleanType.replace(/Login$/, '');
  cleanType = cleanType.replace(/Response$/, '');
  cleanType = cleanType.replace(/Request$/, '');
  
  const formattedTypeName = toPascalCase(cleanType);
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Si el formattedTypeName ya contiene "Enum", no agregarlo de nuevo
  const enumSuffix = formattedTypeName.endsWith('Enum') ? '' : 'Enum';
  const pascalCaseName = `${toPascalCase(serviceName)}${cleanOperationName}${formattedTypeName}${enumSuffix}`;
  // Convertir a SCREAMING_SNAKE_CASE para el nombre del enum
  const enumName = toScreamingSnakeCase(pascalCaseName);
  
  // Generar valores del enum
  const enumValues = field.enumValues.map((value: string) => {
    // Convertir valores a nombres válidos de enum
    let enumKey = value
      .replace(/[^a-zA-Z0-9]/g, '_') // Reemplazar caracteres especiales con _
      .replace(/^_+|_+$/g, '') // Quitar _ al inicio y final
      .replace(/_+/g, '_'); // Consolidar múltiples _
    
    // Si está vacío después de limpiar, usar el valor original como clave
    if (!enumKey) {
      enumKey = `VALUE_${Math.abs(value.split('').reduce((a, b) => a + b.charCodeAt(0), 0))}`;
    }
    
    // Si empieza con número, agregar prefijo
    if (/^\d/.test(enumKey)) {
      enumKey = `VALUE_${enumKey}`;
    }
    
    // Casos especiales para operadores (nombres del backend)
    const operatorMappings: { [key: string]: string } = {
      '==': 'EQUALS',
      '>': 'GREATER_THAN',
      '<': 'LESS_THAN',
      '>=': 'GREATER_THAN_OR_EQUAL_TO',
      '<=': 'LESS_THAN_OR_EQUAL_TO',
      '!=': 'DIFFERENT_THAN',
      'like': 'LIKE',
      'in': 'IN',
      'between': 'BETWEEN'
    };
    
    if (operatorMappings[value]) {
      enumKey = operatorMappings[value];
    } else {
      // Convertir a UPPER_CASE si no es un operador especial
      enumKey = enumKey.toUpperCase();
    }
    
    return `  ${enumKey} = "${value}"`;
  }).join(',\n');
  
  return `export enum ${enumName} {
${enumValues}
}`;
}

function generateIndividualNestedDTO(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  // Generar nombre de interface que coincida con el patrón del archivo
  // i-<flujo>-<proceso>-<tipo>-<request/response>-dto.ts → I<Flujo><Proceso><Tipo><Request/Response>DTO
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Limpiar el tipo para obtener solo el nombre base
  let cleanType = typeName;
  cleanType = cleanType.replace(/LoginResponse$/, '');
  cleanType = cleanType.replace(/LoginRequest$/, '');
  cleanType = cleanType.replace(/Login$/, '');
  cleanType = cleanType.replace(/Response$/, '');
  cleanType = cleanType.replace(/Request$/, '');
  
  const formattedTypeName = toPascalCase(cleanType);
  const suffix = type === 'request' ? 'Request' : 'Response';
  const dtoInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedTypeName}${suffix}DTO`;
  
  let dtoFields = '';
  let imports: string[] = [];
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = convertToCamelCase(nestedField.name); // DTO usa camelCase
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo DTO o Enum
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        // Usar el patrón completo: I<Flujo><Proceso><Tipo><Request/Response>DTO o <Flujo><Proceso><Tipo>Enum
        let cleanNestedType = nestedField.type;
        cleanNestedType = cleanNestedType.replace(/LoginResponse$/, '');
        cleanNestedType = cleanNestedType.replace(/LoginRequest$/, '');
        cleanNestedType = cleanNestedType.replace(/Login$/, '');
        cleanNestedType = cleanNestedType.replace(/Response$/, '');
        cleanNestedType = cleanNestedType.replace(/Request$/, '');
        
        const formattedNestedTypeName = toPascalCase(cleanNestedType);
        
        let fieldType;
        if (nestedField.isEnum && nestedField.enumValues) {
          // Para enums, usar el nombre del enum en SCREAMING_SNAKE_CASE (evitar duplicar "Enum")
          const enumSuffix = formattedNestedTypeName.endsWith('Enum') ? '' : 'Enum';
          const pascalCaseName = `${toPascalCase(serviceName)}${cleanOperationName}${formattedNestedTypeName}${enumSuffix}`;
          fieldType = toScreamingSnakeCase(pascalCaseName);
        } else {
          // Para interfaces, usar el patrón normal
          const nestedSuffix = type === 'request' ? 'Request' : 'Response';
          fieldType = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedNestedTypeName}${nestedSuffix}DTO`;
        }
        
        // Agregar import para tipos complejos con patrón completo
        const formattedNestedType = cleanNestedType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
        const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
        const operationNameKebab = operationName.replace(/_/g, '-');
        
        let importFileName;
        if (nestedField.isEnum && nestedField.enumValues) {
          // Para enums, usar el patrón: <flujo>-<proceso>-<tipo>-<request/response>-dto
          const typeKebab = type === 'request' ? 'request' : 'response';
          importFileName = `${serviceNameKebab}-${operationNameKebab}-${formattedNestedType}-${typeKebab}-dto`;
        } else {
          // Para interfaces, usar el patrón: i-<flujo>-<proceso>-<tipo>-<request/response>-dto
          const typeKebab = type === 'request' ? 'request' : 'response';
          importFileName = `i-${serviceNameKebab}-${operationNameKebab}-${formattedNestedType}-${typeKebab}-dto`;
        }
        
        imports.push(`import { ${fieldType} } from "./${importFileName}";`);
        
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${nestedField.type}${arrayMark};`;
      }
    });
    
    dtoFields = fieldMappings.join('\n');
  }

  const importsSection = imports.length > 0 ? imports.join('\n') + '\n\n' : '';

  return `${importsSection}export interface ${dtoInterfaceName} {
${dtoFields}
}`;
}

async function generateNestedEntitiesForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      let nestedEntity;
      
      // Si es un enum, generar archivo de enum en lugar de interfaz
      if (field.isEnum && field.enumValues) {
        nestedEntity = generateIndividualEnum(field.type, field, apiName, serviceName, operationName, type);
      } else {
        // Generar Entity individual para cada interface anidada con patrón correcto
        nestedEntity = generateIndividualNestedEntity(field.type, field, apiName, serviceName, operationName, type);
      }
      
      // Patrón correcto: i-<flujo>-<proceso>-<tipo>-<request/response>-entity.ts
      // Limpiar el tipo para obtener solo el nombre base sin sufijos Login/Response
      let cleanType = field.type;
      // Remover múltiples sufijos en orden específico
      cleanType = cleanType.replace(/LoginResponse$/, ''); // CompanyLoginResponse -> Company
      cleanType = cleanType.replace(/LoginRequest$/, '');   // CompanyLoginRequest -> Company  
      cleanType = cleanType.replace(/Login$/, '');          // CompanyLogin -> Company
      cleanType = cleanType.replace(/Response$/, '');       // CompanyResponse -> Company
      cleanType = cleanType.replace(/Request$/, '');        // CompanyRequest -> Company
      
      const baseFileName = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
      const operationKebab = operationName.replace(/_/g, '-');
      
      let nestedFileName;
      if (field.isEnum && field.enumValues) {
        // Para enums, usar el patrón: <flujo>-<proceso>-<tipo>-<request/response>-entity.ts
        nestedFileName = `${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-entity.ts`;
      } else {
        // Para interfaces, usar el patrón normal
        nestedFileName = `i-${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-entity.ts`;
      }
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedEntity
      );
      
      // Generar nombre de clase que coincida con el patrón del archivo
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      // Limpiar el tipo para obtener solo el nombre base
      let cleanFieldType = field.type;
      cleanFieldType = cleanFieldType.replace(/LoginResponse$/, '');
      cleanFieldType = cleanFieldType.replace(/LoginRequest$/, '');
      cleanFieldType = cleanFieldType.replace(/Login$/, '');
      cleanFieldType = cleanFieldType.replace(/Response$/, '');
      cleanFieldType = cleanFieldType.replace(/Request$/, '');
      
      const formattedFieldType = toPascalCase(cleanFieldType);
      
      let exportClassName;
      if (field.isEnum && field.enumValues) {
        // Para enums, usar el nombre del enum en SCREAMING_SNAKE_CASE
        const enumSuffix = formattedFieldType.endsWith('Enum') ? '' : 'Enum';
        const pascalCaseName = `${toPascalCase(serviceName)}${cleanOperationName}${formattedFieldType}${enumSuffix}`;
        exportClassName = toScreamingSnakeCase(pascalCaseName);
      } else {
        // Para interfaces, usar el patrón normal
        const suffix = type === 'request' ? 'Request' : 'Response';
        exportClassName = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedFieldType}${suffix}Entity`;
      }
      
      // Export statement con el nombre correcto del archivo
      const fileNameForExport = nestedFileName.replace('.ts', '');
      exportStatements.push(`export { ${exportClassName} } from './${operationName}/${fileNameForExport}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

function generateIndividualNestedEntity(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  // Generar nombre de interface que coincida con el patrón del archivo
  // i-<flujo>-<proceso>-<tipo>-<request/response>-entity.ts → I<Flujo><Proceso><Tipo><Request/Response>Entity
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Limpiar el tipo para obtener solo el nombre base
  let cleanType = typeName;
  cleanType = cleanType.replace(/LoginResponse$/, '');
  cleanType = cleanType.replace(/LoginRequest$/, '');
  cleanType = cleanType.replace(/Login$/, '');
  cleanType = cleanType.replace(/Response$/, '');
  cleanType = cleanType.replace(/Request$/, '');
  
  const formattedTypeName = toPascalCase(cleanType);
  const suffix = type === 'request' ? 'Request' : 'Response';
  const entityInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedTypeName}${suffix}Entity`;
  
  let entityFields = '';
  let imports: string[] = [];
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = nestedField.name; // Entity usa snake_case como viene del swagger
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo Entity o Enum
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        // Usar el patrón completo: I<Flujo><Proceso><Tipo><Request/Response>Entity o <Flujo><Proceso><Tipo>Enum
        let cleanNestedType = nestedField.type;
        cleanNestedType = cleanNestedType.replace(/LoginResponse$/, '');
        cleanNestedType = cleanNestedType.replace(/LoginRequest$/, '');
        cleanNestedType = cleanNestedType.replace(/Login$/, '');
        cleanNestedType = cleanNestedType.replace(/Response$/, '');
        cleanNestedType = cleanNestedType.replace(/Request$/, '');
        
        const formattedNestedTypeName = toPascalCase(cleanNestedType);
        
        let fieldType, importFileName;
        if (nestedField.isEnum && nestedField.enumValues) {
          // Para enums, usar el nombre del enum en SCREAMING_SNAKE_CASE
          const enumSuffix = formattedNestedTypeName.endsWith('Enum') ? '' : 'Enum';
          const pascalCaseName = `${toPascalCase(serviceName)}${cleanOperationName}${formattedNestedTypeName}${enumSuffix}`;
          fieldType = toScreamingSnakeCase(pascalCaseName);
          
          // Para enums, usar el patrón: <flujo>-<proceso>-<tipo>-<request/response>-entity
          const formattedNestedType = cleanNestedType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
          const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
          const operationNameKebab = operationName.replace(/_/g, '-');
          const typeKebab = type === 'request' ? 'request' : 'response';
          importFileName = `${serviceNameKebab}-${operationNameKebab}-${formattedNestedType}-${typeKebab}-entity`;
        } else {
          // Para interfaces, usar el patrón normal
          const nestedSuffix = type === 'request' ? 'Request' : 'Response';
          fieldType = `I${toPascalCase(serviceName)}${cleanOperationName}${formattedNestedTypeName}${nestedSuffix}Entity`;
          
          // Patron: i-<flujo>-<proceso>-<tipo>-<request/response>-entity.ts        
          const formattedNestedType = cleanNestedType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
          const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
          const operationNameKebab = operationName.replace(/_/g, '-');
          const typeKebab = type === 'request' ? 'request' : 'response';
          importFileName = `i-${serviceNameKebab}-${operationNameKebab}-${formattedNestedType}-${typeKebab}-entity`;
        }
        
        imports.push(`import { ${fieldType} } from "./${importFileName}";`);
        
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${nestedField.type}${arrayMark};`;
      }
    });
    
    entityFields = fieldMappings.join('\n');
  }

  const importsSection = imports.length > 0 ? imports.join('\n') + '\n\n' : '';

  return `${importsSection}export interface ${entityInterfaceName} {
${entityFields}
}`;
}

// ======================================================================
// NUEVAS FUNCIONES PARA COMPLETAR EL FLUJO DE NEGOCIO
// ======================================================================

async function generateDomainRepositoryInterfaces(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameLower = serviceName.toLowerCase();
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    
    // Generar interface del repositorio para el servicio
    const repositoryInterface = `import { IConfigDTO } from "@bus/core/interfaces";
import { 
${schema.businessOperations.map(operation => {
  const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
  const operationName = rawOperationName.replace(/_/g, '-');
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const lines = [];
  if (operation.responseFields && operation.responseFields.length > 0) {
    lines.push(`  I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`);
  }
  return lines.join(',\n');
}).filter(line => line).join(',\n')}
} from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
${schema.businessOperations.some(op => op.fields && op.fields.length > 0) ? 
`import {
${schema.businessOperations.map(operation => {
  const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
  const operationName = rawOperationName.replace(/_/g, '-');
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const lines = [];
  if (operation.fields && operation.fields.length > 0) {
    lines.push(`  I${toPascalCase(serviceName)}${cleanOperationName}RequestEntity`);
  }
  return lines.join(',\n');
}).filter(line => line).join(',\n')}
} from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}";` 
: ''}

export abstract class I${toPascalCase(serviceName)}Repository {
${schema.businessOperations.map(operation => {
  const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
  const operationName = rawOperationName.replace(/_/g, '-');
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Convertir operationName a camelCase para el nombre del método
  const operationCamelCase = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const baseResponseType = operation.responseFields && operation.responseFields.length > 0 
    ? `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO` 
    : 'any';
  const responseType = operation.isResponseArray 
    ? `${baseResponseType}[] | null`
    : `${baseResponseType} | null`;
  
  // Si tiene campos de request, incluir params, sino solo config
  const hasRequestFields = operation.fields && operation.fields.length > 0;
  const requestType = hasRequestFields ? `I${toPascalCase(serviceName)}${cleanOperationName}RequestEntity` : null;
  const params = hasRequestFields ? `params: ${requestType}, ` : '';
  
  return `  abstract ${operationCamelCase}(${params}config: IConfigDTO): Promise<${responseType}>;`;
}).join('\n')}
}`;

    await fs.writeFile(
      path.join(paths.domainRepositories, `i-${serviceNameKebab}-repository.ts`),
      repositoryInterface
    );
    console.log(chalk.green(`✅ Repository Interface: i-${serviceNameKebab}-repository.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generó repository interface porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateDomainUseCases(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameLower = serviceName.toLowerCase();
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationKebab = operationName.replace(/_/g, '-');
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      // Los casos de uso van directamente en la carpeta del servicio (sin subcarpetas)
      await fs.ensureDir(paths.domainUseCases);

            // Generar Use Case si tiene responseFields (puede o no tener request)
      if (operation.responseFields && operation.responseFields.length > 0) {
        const hasRequest = operation.fields && operation.fields.length > 0;
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        const baseResponseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const responseDTOName = operation.isResponseArray ? `${baseResponseDTOName}[]` : baseResponseDTOName;
        const useCaseClassName = `${toPascalCase(serviceName)}${cleanOperationName}UseCase`;
        
        // Convertir operationName a camelCase para el método del repository
        const operationCamelCase = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

        // Seguir el patrón de entities: usar un solo mapper y estructura simple
        const dtoImports = hasRequest ? `${requestDTOName}, ${baseResponseDTOName}` : baseResponseDTOName;
        const useCaseInterface = hasRequest ? `UseCase<${requestDTOName}, ${responseDTOName} | null>` : `UseCase<any, ${responseDTOName} | null>`;
        
        // Solo importar mapper si tiene request fields
        const mapperImport = hasRequest ? `import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameKebab}-${operationKebab}-mapper";` : '';
        
        // Método execute siguiendo el patrón
        const executeParams = hasRequest ? `params: ${requestDTOName}, ` : '';
        const repositoryCall = hasRequest ? `this.repository.${operationCamelCase}(paramsEntity, config)` : `this.repository.${operationCamelCase}(config)`;
        const mapperLogic = hasRequest 
          ? `const paramsEntity = this.mapper.mapTo(params);
    return await ${repositoryCall}.then((data) => data ?? null);` 
          : `return await ${repositoryCall}.then((data) => data ?? null);`;

        const useCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ${dtoImports} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
${mapperImport}
import { InjectionPlatformBusinessRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/business/injection-${apiName}-business-repository";

export class ${useCaseClassName} implements ${useCaseInterface} {
  private static instance: ${useCaseClassName};
  private repository = InjectionPlatformBusinessRepository.${toPascalCase(serviceName)}Repository();${hasRequest ? `
  private mapper = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${toPascalCase(serviceName)}${cleanOperationName}RequestMapper();` : ''}

  public static getInstance(): ${useCaseClassName} {
    if (!${useCaseClassName}.instance)
      ${useCaseClassName}.instance = new ${useCaseClassName}();
    return ${useCaseClassName}.instance;
  }

  public async execute(${executeParams}config?: IConfigDTO): Promise<${responseDTOName} | null> {
    ${mapperLogic}
  }
}`;

        await fs.writeFile(
          path.join(paths.domainUseCases, `${serviceNameKebab}-${operationKebab}-use-case.ts`),
          useCase
        );
        console.log(chalk.green(`✅ Use Case: ${serviceNameKebab}-${operationKebab}-use-case.ts`));
      }
    }
  } else {
    console.log(chalk.yellow('⚠️  No se generaron use cases porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateBusinessFacades(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameLower = serviceName.toLowerCase();
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    // Generar facade para el servicio completo
    const facadeClassName = `${toPascalCase(serviceName)}Facade`;
    
    const imports = schema.businessOperations
      .filter(operation => operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        const hasRequest = operation.fields && operation.fields.length > 0;
        if (hasRequest) {
          return `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO,\n  I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        } else {
          return `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        }
      }).join(',\n  ');

    // Import del injection de use cases (como en entities)
    const useCaseInjectionImport = `import { InjectionPlatformBusiness${toPascalCase(serviceName)}UseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/injection/business/injection-${apiName}-business-${serviceNameKebab}-use-case";`;

    // Use case instances (como en entities)
    const useCaseInstances = schema.businessOperations
      .filter(operation => operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        // Convertir operationName a camelCase para las variables
        const operationCamelCase = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `  private readonly ${operationCamelCase}UseCase = InjectionPlatformBusiness${toPascalCase(serviceName)}UseCase.${toPascalCase(serviceName)}${cleanOperationName}UseCase();`;
      }).join('\n');

    // Métodos del facade (como en entities)
    const facadeMethods = schema.businessOperations
      .filter(operation => operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        // Convertir operationName a camelCase para métodos y variables
        const operationCamelCase = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        const hasRequest = operation.fields && operation.fields.length > 0;
        const params = hasRequest ? `params: I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO, ` : '';
        const args = hasRequest ? 'params, config' : 'config';
        
        const baseResponseType = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const responseType = operation.isResponseArray ? `${baseResponseType}[]` : baseResponseType;
        return `  public async ${operationCamelCase}(${params}config?: IConfigDTO): Promise<${responseType} | null> {
    return await this.${operationCamelCase}UseCase.execute(${args});
  }`;
      }).join('\n\n');

    const facade = `import { IConfigDTO } from "@bus/core/interfaces";
import {
  ${imports},
} from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
${useCaseInjectionImport}

export class ${facadeClassName} {
  private static instance: ${facadeClassName};

${useCaseInstances}

  public static getInstance(): ${facadeClassName} {
    if (!${facadeClassName}.instance)
      ${facadeClassName}.instance = new ${facadeClassName}();
    return ${facadeClassName}.instance;
  }

${facadeMethods}
}`;

    await fs.writeFile(
      path.join(paths.facades, `${serviceNameKebab}-facade.ts`),
      facade
    );
    console.log(chalk.green(`✅ Facade: ${serviceNameKebab}-facade.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generó facade porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateMapperInjectionPerOperation(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameLower = serviceName.toLowerCase();
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    // Crear directorio injection en la ubicación correcta
    await fs.ensureDir(paths.injectionMappers);

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationKebab = operationName.replace(/_/g, '-');
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      // Recopilar todos los mappers de esta operación
      const mapperNames: string[] = [];
      const mapperMethods: string[] = [];

      // Request mapper (si existe)
      if (operation.fields && operation.fields.length > 0) {
        const requestMapperName = `${toPascalCase(serviceName)}${cleanOperationName}RequestMapper`;
        mapperNames.push(requestMapperName);
        mapperMethods.push(`  public static ${requestMapperName}(): ${requestMapperName} {
    return ${requestMapperName}.getInstance();
  }`);
      }

      // Response mapper (si existe)
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseMapperName = `${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper`;
        mapperNames.push(responseMapperName);
        mapperMethods.push(`  public static ${responseMapperName}(): ${responseMapperName} {
    return ${responseMapperName}.getInstance();
  }`);

        // Mappers anidados de response (si existen)
        const responseNestedMappers = await collectNestedMappersForOperation(operation, 'response', serviceName, operationName);
        for (const nestedMapper of responseNestedMappers) {
          const nestedMapperName = nestedMapper.className;
          
          // Generar nombre de método abreviado removiendo el prefijo del servicio y operación
          // Ejemplo: AuthLoginPlatformConfigurationResponseMapper -> PlatformConfigurationResponseMapper
          const formattedServiceName = toPascalCase(serviceName);
          const methodName = nestedMapperName.replace(new RegExp(`^${formattedServiceName}${cleanOperationName}`, ''), '');
          
          mapperNames.push(nestedMapperName);
          mapperMethods.push(`  public static ${methodName}(): ${nestedMapperName} {
    return ${nestedMapperName}.getInstance();
  }`);
        }
      }

      // Mappers anidados de request (si existen)
      if (operation.fields && operation.fields.length > 0) {
        const requestNestedMappers = await collectNestedMappersForOperation(operation, 'request', serviceName, operationName);
        for (const nestedMapper of requestNestedMappers) {
          const nestedMapperName = nestedMapper.className;
          
          // Generar nombre de método abreviado removiendo el prefijo del servicio y operación
          // Ejemplo: AvailabilityAppointmentTableFilterManagerRequestMapper -> FilterManagerRequestMapper
          const formattedServiceName = toPascalCase(serviceName);
          const methodName = nestedMapperName.replace(new RegExp(`^${formattedServiceName}${cleanOperationName}`, ''), '');
          
          mapperNames.push(nestedMapperName);
          mapperMethods.push(`  public static ${methodName}(): ${nestedMapperName} {
    return ${nestedMapperName}.getInstance();
  }`);
        }
      }

      // Solo crear injection si hay mappers
      if (mapperNames.length > 0) {
        const injectionClassName = `InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper`;
        
        // Generar import unificado usando el index.ts
        const importStatement = `import { 
  ${mapperNames.join(',\n  ')}
} from "@${apiName}/infrastructure/mappers/apis/${apiName}/business/${serviceNameLower}";`;
        
        const injectionContent = `${importStatement}

export class ${injectionClassName} {
${mapperMethods.join('\n\n')}
}`;

        // Generar archivo en la ubicación correcta: /infrastructure/mappers/apis/platform/injection/business/auth/
        await fs.writeFile(
          path.join(paths.injectionMappers, `injection-${apiName}-business-${serviceNameKebab}-${operationKebab}-mapper.ts`),
          injectionContent
        );
        console.log(chalk.green(`✅ Injection Mapper (${operationName}): injection-${apiName}-business-${serviceNameKebab}-${operationKebab}-mapper.ts`));
      }
    }
  } else {
    console.log(chalk.yellow('⚠️  No se generaron injection files porque no hay operaciones de negocio detectadas.'));
  }
}

async function collectNestedMappersForOperation(operation: any, type: 'request' | 'response', serviceName: string, operationName: string): Promise<Array<{className: string, fileName: string}>> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const nestedMappers: Array<{className: string, fileName: string}> = [];
  const generated = new Set<string>();

  function processNestedFields(field: any, serviceName: string, operationName: string) {
    // Solo generar mappers para interfaces, NO para enums (los enums se mapean directamente)
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !field.isEnum && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Aplicar el patrón correcto: <flujo>-<proceso>-<tipo>-<request/response>-mapper
      const serviceNameKebab = serviceName.toLowerCase();
      const operationKebab = operationName.replace(/_/g, '-');
      let typeKebab = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      const suffix = type === 'request' ? 'request' : 'response';
      
      // Detectar y evitar duplicación de operaciones en el nombre del tipo para archivos
      const operationInFileName = operationKebab.toLowerCase();
      if (typeKebab.includes(operationInFileName)) {
        // Eliminar la operación del tipo: user-login-response -> user-response
        typeKebab = typeKebab.replace(new RegExp(`-${operationInFileName}`, 'gi'), '');
      }
      
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const fileName = needsSuffix 
        ? `${serviceNameKebab}-${operationKebab}-${typeKebab}-${suffix}-mapper`
        : `${serviceNameKebab}-${operationKebab}-${typeKebab}-mapper`;
      
      // Para el nombre de la clase: <Flujo><Proceso><Tipo><Request/Response>Mapper
      const formattedServiceName = toPascalCase(serviceName);
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      const formattedFieldType = toPascalCase(field.type);
      const classSuffix = type === 'request' ? 'Request' : 'Response';
      
      // Limpiar caracteres especiales para nombres de clase válidos
      const cleanFormattedType = formattedFieldType.replace(/[\[\]]/g, 'Array');
      
      // Aplicar la misma lógica de limpieza simplificada que en generateIndividualNestedMapper
      let finalTypeName = cleanFormattedType;
      
      // Remover sufijos redundantes para obtener nombre base limpio (igual que en generateIndividualNestedMapper)
      finalTypeName = finalTypeName.replace(/LoginResponse$|LoginRequest$|Response$|Request$/, '');
      
      // Generar nombre de clase consistente con la lógica de generateIndividualNestedMapper
      const className = `${formattedServiceName}${cleanOperationName}${finalTypeName}${classSuffix}Mapper`;

      nestedMappers.push({
        className,
        fileName
      });

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach((nestedField: any) => processNestedFields(nestedField, serviceName, operationName));
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach((field: any) => processNestedFields(field, serviceName, operationName));
  }

  return nestedMappers;
}

async function generateInfrastructureRepositories(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameLower = serviceName.toLowerCase();
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    const repositoryClassName = `${toPascalCase(serviceName)}Repository`;

    // Generar imports para todas las DTOs y Entities necesarias
    const allImports = {
      dtos: new Set<string>(),
      entities: new Set<string>(),
      mapperImports: new Set<string>(),
      mapperInstances: [] as string[]
    };

    // Generar métodos para todas las operaciones
    const methods: string[] = [];

    for (const operation of schema.businessOperations) {
      const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
      const operationKebab = operationName.replace(/_/g, '-');
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      // Generar método si tiene responseFields (puede o no tener request)
      if (operation.responseFields && operation.responseFields.length > 0) {
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        const baseResponseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const responseDTOName = operation.isResponseArray ? `${baseResponseDTOName}[]` : baseResponseDTOName;
        const requestEntityName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestEntity`;
        const responseEntityName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseEntity`;

        // Agregar imports (solo entities de request y DTOs de response)
        const hasRequest = operation.fields && operation.fields.length > 0;
        if (hasRequest) {
          allImports.entities.add(requestEntityName);
        }
        allImports.dtos.add(responseDTOName);
        allImports.entities.add(responseEntityName);
        allImports.mapperImports.add(`import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameKebab}-${operationKebab}-mapper";`);

        // Agregar instancias de mappers (solo Response mappers)
        const operationCamelCaseVar = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        // Solo agregar Response mapper (los Request mappers no se usan en el repository)
        allImports.mapperInstances.push(`  private ${operationCamelCaseVar}ResponseMapper = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper();`);

        // Convertir operationName a camelCase para el nombre del método
        const operationCamelCase = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string, index: number) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

        // Generar método
        const methodParams = hasRequest ? `params: ${requestEntityName}, ` : '';
        const methodCall = hasRequest ? 'params' : '{}';
        const method = `  public async ${operationCamelCase}(
    ${methodParams}config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<${responseDTOName} | null> {
    if (config.loadService)
      return platformAxios
        .post(CONST_PLATFORM_API_ROUTES.${serviceName.toUpperCase()}_${operationName.toUpperCase().replace(/-/g, '_')}, ${methodCall})
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<${responseEntityName}>(data);
          if (entity)
            return this.${operationCamelCaseVar}ResponseMapper.${operation.isResponseArray ? 'mapFromList' : 'mapFrom'}(entity);
          return null;
        });
    return null;
  }`;

        methods.push(method);
      }
    }

    // Generar el archivo completo
    const dtoImports = Array.from(allImports.dtos).join(', ');
    const entityImports = Array.from(allImports.entities).join(', ');
    const mapperImports = Array.from(allImports.mapperImports).join('\n');

    const repository = `import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { I${toPascalCase(serviceName)}Repository } from "@${apiName}/domain/services/repositories/apis/${apiName}/business/i-${serviceNameKebab}-repository";
import { ${dtoImports} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
import { ${entityImports} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}";
${mapperImports}

export class ${repositoryClassName} extends I${toPascalCase(serviceName)}Repository {

  private static instance: ${repositoryClassName};
  private readonly resolve = InjectionCore.Resolve();
${allImports.mapperInstances.join('\n')}

  private constructor() {
    super();
  }

  public static getInstance(): ${repositoryClassName} {
    if (!${repositoryClassName}.instance)
      ${repositoryClassName}.instance = new ${repositoryClassName}();
    return ${repositoryClassName}.instance;
  }

${methods.join('\n\n')}
}`;

    await fs.writeFile(
      path.join(paths.infraRepositories, `${serviceNameKebab}-repository.ts`),
      repository
    );
    console.log(chalk.green(`✅ Infrastructure Repository: ${serviceNameKebab}-repository.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron infrastructure repositories porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateRepositoryInjectionFiles(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    const injectionFilePath = path.join(paths.injectionRepositories, `injection-${apiName}-business-repository.ts`);
    
    // Datos del repository actual
    const currentRepository = {
      serviceName: toPascalCase(serviceName),
      import: `import { ${toPascalCase(serviceName)}Repository } from "../../business/${serviceName.toLowerCase()}/${serviceNameKebab}-repository";`,
      method: `  public static ${toPascalCase(serviceName)}Repository() { return ${toPascalCase(serviceName)}Repository.getInstance(); }`
    };

    let existingRepositories: any[] = [];
    let existingImports: string[] = [];

    // Leer archivo existente si existe
    if (await fs.pathExists(injectionFilePath)) {
      try {
        const existingContent = await fs.readFile(injectionFilePath, 'utf-8');
        
        // Extraer imports existentes
        const importMatches = existingContent.match(/import \{[^}]+\} from "[^"]+";/g);
        if (importMatches) {
          existingImports = importMatches.filter(imp => !imp.includes(`${toPascalCase(serviceName)}Repository`));
        }
        
        // Extraer métodos existentes
        const methodMatches = existingContent.match(/public static \w+Repository\(\)[^}]+}/g);
        if (methodMatches) {
          existingRepositories = methodMatches
            .filter(method => !method.includes(`${toPascalCase(serviceName)}Repository`))
            .map(method => ({ method: `  ${method}` }));
        }
      } catch (error) {
        console.log(chalk.yellow(`⚠️  No se pudo leer el archivo existente: ${error}`));
      }
    }

    // Combinar imports (existentes + actual)
    const allImports = [...existingImports, currentRepository.import].join('\n');
    
    // Combinar métodos (existentes + actual)
    const allMethods = [...existingRepositories.map(r => r.method), currentRepository.method].join('\n');
    
    // Generar archivo completo
    const injectionFile = `${allImports}

export class InjectionPlatformBusinessRepository {
${allMethods}
}`;

    await fs.writeFile(injectionFilePath, injectionFile);
    console.log(chalk.green(`✅ Repository Injection: injection-${apiName}-business-repository.ts (actualizado)`));
  } else {
    console.log(chalk.yellow('⚠️  No se generó repository injection porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateBusinessInjectionFiles(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    // 1. Use Case Injection
    const useCaseImports = schema.businessOperations
      .filter(operation => operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
        const operationKebab = operationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `import { ${toPascalCase(serviceName)}${cleanOperationName}UseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/business/${serviceName.toLowerCase()}/${serviceNameKebab}-${operationKebab}-use-case";`;
      }).join('\n');

    const useCaseMethods = schema.businessOperations
      .filter(operation => operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const rawOperationName = operation.path.split('/').pop() || operation.operationId.toLowerCase();
      const operationName = rawOperationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `  public static ${toPascalCase(serviceName)}${cleanOperationName}UseCase(): ${toPascalCase(serviceName)}${cleanOperationName}UseCase {
    return ${toPascalCase(serviceName)}${cleanOperationName}UseCase.getInstance();
  }`;
      }).join('\n\n');

    const useCaseInjection = `${useCaseImports}

export class InjectionPlatformBusiness${toPascalCase(serviceName)}UseCase {
${useCaseMethods}
}`;

    await fs.writeFile(
      path.join(paths.injectionUseCases, `injection-${apiName}-business-${serviceNameKebab}-use-case.ts`),
      useCaseInjection
    );
    console.log(chalk.green(`✅ Use Case Injection: injection-${apiName}-business-${serviceNameKebab}-use-case.ts`));

    // 2. Facade Injection (acumulativo como repositories)
    await generateFacadeInjectionFiles(serviceName, paths, apiName);
  } else {
    console.log(chalk.yellow('⚠️  No se generaron archivos de inyección porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateFacadeInjectionFiles(serviceName: string, paths: any, apiName: string = 'platform'): Promise<void> {
  const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  const injectionFilePath = path.join(paths.injectionFacades, `injection-${apiName}-business-facade.ts`);
  
  // Datos del facade actual
  const currentFacade = {
    serviceName: toPascalCase(serviceName),
    import: `import { ${toPascalCase(serviceName)}Facade } from "@${apiName}/facade/apis/${apiName}/business/${serviceNameKebab}-facade";`,
    method: `    public static ${toPascalCase(serviceName)}Facade() { return ${toPascalCase(serviceName)}Facade.getInstance(); }`
  };

  let existingFacades: any[] = [];
  let existingImports: string[] = [];

  // Leer archivo existente si existe
  if (await fs.pathExists(injectionFilePath)) {
    try {
      const existingContent = await fs.readFile(injectionFilePath, 'utf-8');
      
      // Extraer imports existentes
      const importMatches = existingContent.match(/import \{[^}]+\} from "[^"]+";/g);
      if (importMatches) {
        existingImports = importMatches.filter(imp => !imp.includes(`${toPascalCase(serviceName)}Facade`));
      }
      
      // Extraer métodos existentes
      const methodMatches = existingContent.match(/public static \w+Facade\(\)[^}]+}/g);
      if (methodMatches) {
        existingFacades = methodMatches
          .filter(method => !method.includes(`${toPascalCase(serviceName)}Facade`))
          .map(method => ({ method: `    ${method}` }));
      }
    } catch (error) {
      console.log(chalk.yellow(`⚠️  No se pudo leer el archivo existente: ${error}`));
    }
  }

  // Combinar imports (existentes + actual)
  const allImports = [...existingImports, currentFacade.import].join('\n');
  
  // Combinar métodos (existentes + actual)
  const allMethods = [...existingFacades.map(f => f.method), currentFacade.method].join('\n');
  
  // Generar archivo completo
  const injectionFile = `${allImports}

export class InjectionPlatformBusinessFacade {
${allMethods}
}`;

  await fs.writeFile(injectionFilePath, injectionFile);
  console.log(chalk.green(`✅ Facade Injection: injection-${apiName}-business-facade.ts (actualizado)`));
}
