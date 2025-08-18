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
    injectionFacades: path.join(basePath, `${apiPrefix}facade/apis/${targetApiName}/injection/business`)
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
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
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
    // Generar index.ts
    const indexContent = exportStatements.join('\n') + '\n';
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
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
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
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
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
        
        // Generar DTOs para interfaces anidadas
        await generateNestedDTOsForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        exportStatements.push(`export { ${responseDTOName} } from './${operationName}/${responseFileName.replace('.ts', '')}';`);
      }
    }
    
    // Generar index.ts para DTOs
    const indexContent = exportStatements.join('\n') + '\n';
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
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Generar mapper individual para cada interface anidada
      const nestedMapper = generateIndividualNestedMapper(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `${baseFileName}-${type}-mapper.ts`
        : `${baseFileName}-mapper.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedMapper
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const mapperClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `${formattedFieldType}Mapper` 
        : `${formattedFieldType}${suffix}Mapper`;
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
    .replace(/(^|_|-)(\w)/g, (_: string, __: string, c: string) => c ? c.toUpperCase() : '')
    .replace(/Dto$/i, 'Entity')
    .replace(/EntityEntity$/, 'Entity');
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
        fieldType = typeName.endsWith('Response') || typeName.endsWith('Request') 
          ? `I${typeName}Entity` 
          : `I${typeName}${suffix}Entity`;
        
        // Agregar import para tipos complejos
        const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
        const importFileName = needsSuffix 
          ? `i-${baseFileName}-${type}-entity`
          : `i-${baseFileName}-entity`;
        
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
        const nestedMapperName = `${field.type.toLowerCase()}${suffix.toLowerCase()}Mapper`;
        nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${mapperClassName}()`);
        
        if (field.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName})`;
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
        const nestedMapperName = `${field.type.toLowerCase()}${suffix.toLowerCase()}Mapper`;
        
        if (field.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName})`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    // Agregar imports e instancias de mappers anidados si existen
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameLower}-${operationName}-mapper";\n`;
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
  const suffix = type === 'request' ? 'Request' : 'Response';
  
  // Crear cleanOperationName aquí también
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Evitar duplicación si el tipo ya termina en Request o Response
  const dtoInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}DTO` 
    : `I${formattedTypeName}${suffix}DTO`;
  const entityInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}Entity` 
    : `I${formattedTypeName}${suffix}Entity`;
  const mapperClassName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `${formattedTypeName}Mapper` 
    : `${formattedTypeName}${suffix}Mapper`;
  
  let mapFromFields = '';
  let mapToFields = '';
  let nestedMapperImports = '';
  let nestedMapperInstances = '';
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const nestedMappers: string[] = [];
    
    const mapFromMappings = field.nestedFields.map((nestedField: any) => {
      const dtoFieldName = convertToCamelCase(nestedField.name);
      const entityFieldName = nestedField.name;
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const nestedMapperClassName = nestedFieldTypeName.endsWith('Response') || nestedFieldTypeName.endsWith('Request') 
          ? `${nestedFieldTypeName}Mapper` 
          : `${nestedFieldTypeName}${nestedSuffix}Mapper`;
        const nestedMapperName = `${nestedField.type.toLowerCase()}${nestedSuffix.toLowerCase()}Mapper`;
        nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper.${nestedMapperClassName}()`);
        
        if (nestedField.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName})`;
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
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const nestedMapperName = nestedFieldTypeName.endsWith('Response') || nestedFieldTypeName.endsWith('Request') 
          ? `${nestedField.type.toLowerCase()}Mapper` 
          : `${nestedField.type.toLowerCase()}${nestedSuffix.toLowerCase()}Mapper`;
        
        if (nestedField.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName})`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/${serviceNameLower}/injection-${apiName}-business-${serviceNameLower}-${operationName}-mapper";\n`;
      nestedMapperInstances = nestedMappers.join('\n');
    }
    
    mapFromFields = mapFromMappings.join(',\n');
    mapToFields = mapToMappings.join(',\n');
  }

  return `import { Mapper } from "@bus/core/classes";
import { ${dtoInterfaceName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}/${operationName}";
import { ${entityInterfaceName} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}/${operationName}";
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
      
      // Generar DTO individual para cada interface anidada
      const nestedDTO = generateIndividualNestedDTO(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `i-${baseFileName}-${type}-dto.ts`
        : `i-${baseFileName}-dto.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedDTO
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const dtoClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `I${formattedFieldType}DTO` 
        : `I${formattedFieldType}${suffix}DTO`;
      exportStatements.push(`export { ${dtoClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

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
        // Evitar duplicación si el tipo ya termina en Request o Response
        const fieldType = typeName.endsWith('Response') || typeName.endsWith('Request') 
          ? `I${typeName}DTO` 
          : `I${typeName}${suffix}DTO`;
        
        // Agregar import para tipos complejos
        const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
        const importFileName = needsSuffix 
          ? `i-${baseFileName}-${type}-dto`
          : `i-${baseFileName}-dto`;
        
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

function generateIndividualNestedDTO(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  const formattedTypeName = toPascalCase(typeName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  // Evitar duplicación si el tipo ya termina en Request o Response
  const dtoInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}DTO` 
    : `I${formattedTypeName}${suffix}DTO`;
  
  let dtoFields = '';
  let imports: string[] = [];
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = convertToCamelCase(nestedField.name); // DTO usa camelCase
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo DTO
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const fieldType = nestedTypeName.endsWith('Response') || nestedTypeName.endsWith('Request') 
          ? `I${nestedTypeName}DTO` 
          : `I${nestedTypeName}${nestedSuffix}DTO`;
        
        // Agregar import para tipos complejos
        const baseFileName = nestedField.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const needsSuffix = !nestedField.type.toLowerCase().endsWith('response') && !nestedField.type.toLowerCase().endsWith('request');
        const importFileName = needsSuffix 
          ? `i-${baseFileName}-${type}-dto`
          : `i-${baseFileName}-dto`;
        
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
      
      // Generar Entity individual para cada interface anidada
      const nestedEntity = generateIndividualNestedEntity(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `i-${baseFileName}-${type}-entity.ts`
        : `i-${baseFileName}-entity.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedEntity
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const entityClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `I${formattedFieldType}Entity` 
        : `I${formattedFieldType}${suffix}Entity`;
      exportStatements.push(`export { ${entityClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

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
  const formattedTypeName = toPascalCase(typeName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  // Evitar duplicación si el tipo ya termina en Request or Response
  const entityInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}Entity` 
    : `I${formattedTypeName}${suffix}Entity`;
  
  let entityFields = '';
  let imports: string[] = [];
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = nestedField.name; // Entity usa snake_case como viene del swagger
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo Entity
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request or Response
        const fieldType = nestedTypeName.endsWith('Response') || nestedTypeName.endsWith('Request') 
          ? `I${nestedTypeName}Entity` 
          : `I${nestedTypeName}${nestedSuffix}Entity`;
        
        // Agregar import para tipos complejos
        const baseFileName = nestedField.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
        const needsSuffix = !nestedField.type.toLowerCase().endsWith('response') && !nestedField.type.toLowerCase().endsWith('request');
        const importFileName = needsSuffix 
          ? `i-${baseFileName}-${type}-entity`
          : `i-${baseFileName}-entity`;
        
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
  const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const lines = [];
  if (operation.fields && operation.fields.length > 0) {
    lines.push(`  I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`);
  }
  if (operation.responseFields && operation.responseFields.length > 0) {
    lines.push(`  I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`);
  }
  return lines.join(',\n');
}).filter(line => line).join(',\n')}
} from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";

export interface I${toPascalCase(serviceName)}Repository {
${schema.businessOperations.map(operation => {
  const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const requestType = operation.fields && operation.fields.length > 0 
    ? `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO` 
    : 'any';
  const responseType = operation.responseFields && operation.responseFields.length > 0 
    ? `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO | null` 
    : 'any';
  
  return `  ${operationName}(params: ${requestType}, config?: IConfigDTO): Promise<${responseType}>;`;
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
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
      const operationKebab = operationName.replace(/_/g, '-');
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      const operationFolder = path.join(paths.domainUseCases, operationName);
      await fs.ensureDir(operationFolder);

      // Solo generar Use Case si tiene tanto request como response
      if (operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0) {
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        const responseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const useCaseClassName = `${toPascalCase(serviceName)}${cleanOperationName}UseCase`;

        const useCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ${requestDTOName}, ${responseDTOName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
import { InjectionPlatformBusiness${toPascalCase(serviceName)}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/business/injection-${apiName}-business-${serviceNameKebab}-mapper";
import { InjectionPlatformBusinessRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/business/injection-${apiName}-business-repository";

export class ${useCaseClassName} implements UseCase<${requestDTOName}, ${responseDTOName} | null> {
  private static instance: ${useCaseClassName};
  private repository = InjectionPlatformBusinessRepository.${toPascalCase(serviceName)}Repository();
  private requestMapper = InjectionPlatformBusiness${toPascalCase(serviceName)}Mapper.${toPascalCase(serviceName)}${cleanOperationName}RequestMapper();
  private responseMapper = InjectionPlatformBusiness${toPascalCase(serviceName)}Mapper.${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper();

  public static getInstance(): ${useCaseClassName} {
    if (!${useCaseClassName}.instance)
      ${useCaseClassName}.instance = new ${useCaseClassName}();
    return ${useCaseClassName}.instance;
  }

  public async execute(params: ${requestDTOName}, config?: IConfigDTO): Promise<${responseDTOName} | null> {
    const paramsEntity = this.requestMapper.mapTo(params);
    const response = await this.repository.${operationName}(paramsEntity, config);
    return response ? this.responseMapper.mapFrom(response) : null;
  }
}`;

        await fs.writeFile(
          path.join(operationFolder, `${serviceNameKebab}-${operationKebab}-use-case.ts`),
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
      .filter(operation => operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO, I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
      }).join(', ');

    const useCaseImports = schema.businessOperations
      .filter(operation => operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
        const operationKebab = operationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `import { ${toPascalCase(serviceName)}${cleanOperationName}UseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/business/${serviceNameLower}/${operationName}/${serviceNameKebab}-${operationKebab}-use-case";`;
      }).join('\n');

    const methods = schema.businessOperations
      .filter(operation => operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        const responseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        const useCaseClassName = `${toPascalCase(serviceName)}${cleanOperationName}UseCase`;

        return `  public async ${operationName}(params: ${requestDTOName}, config?: IConfigDTO): Promise<${responseDTOName} | null> {
    return await this.${operationName}UseCase.execute(params, config);
  }

  private ${operationName}UseCase = ${useCaseClassName}.getInstance();`;
      }).join('\n\n');

    const facade = `import { IConfigDTO } from "@bus/core/interfaces";
import { ${imports} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
${useCaseImports}

export class ${facadeClassName} {
  private static instance: ${facadeClassName};

  public static getInstance(): ${facadeClassName} {
    if (!${facadeClassName}.instance)
      ${facadeClassName}.instance = new ${facadeClassName}();
    return ${facadeClassName}.instance;
  }

${methods}
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
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
      const operationKebab = operationName.replace(/_/g, '-');
      const cleanOperationName = operationName
        .replace(/_/g, '-')
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      // Recopilar todos los mappers de esta operación
      const mapperImports: string[] = [];
      const mapperMethods: string[] = [];

      // Request mapper (si existe)
      if (operation.fields && operation.fields.length > 0) {
        const requestMapperName = `${toPascalCase(serviceName)}${cleanOperationName}RequestMapper`;
        mapperImports.push(`import { ${requestMapperName} } from "@${apiName}/infrastructure/mappers/apis/${apiName}/business/${serviceNameLower}/${operationName}/${serviceNameKebab}-${operationKebab}-request-mapper";`);
        mapperMethods.push(`  public static ${requestMapperName}(): ${requestMapperName} {
    return ${requestMapperName}.getInstance();
  }`);
      }

      // Response mapper (si existe)
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseMapperName = `${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper`;
        mapperImports.push(`import { ${responseMapperName} } from "@${apiName}/infrastructure/mappers/apis/${apiName}/business/${serviceNameLower}/${operationName}/${serviceNameKebab}-${operationKebab}-response-mapper";`);
        mapperMethods.push(`  public static ${responseMapperName}(): ${responseMapperName} {
    return ${responseMapperName}.getInstance();
  }`);

        // Mappers anidados (si existen)
        const nestedMappers = await collectNestedMappersForOperation(operation, 'response');
        for (const nestedMapper of nestedMappers) {
          const nestedMapperName = nestedMapper.className;
          const nestedMapperFile = nestedMapper.fileName;
          mapperImports.push(`import { ${nestedMapperName} } from "@${apiName}/infrastructure/mappers/apis/${apiName}/business/${serviceNameLower}/${operationName}/${nestedMapperFile}";`);
          mapperMethods.push(`  public static ${nestedMapperName}(): ${nestedMapperName} {
    return ${nestedMapperName}.getInstance();
  }`);
        }
      }

      // Solo crear injection si hay mappers
      if (mapperImports.length > 0) {
        const injectionClassName = `InjectionPlatformBusiness${toPascalCase(serviceName)}${cleanOperationName}Mapper`;
        
        const injectionContent = `${mapperImports.join('\n')}

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

async function collectNestedMappersForOperation(operation: any, type: 'request' | 'response'): Promise<Array<{className: string, fileName: string}>> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const nestedMappers: Array<{className: string, fileName: string}> = [];
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const fileName = needsSuffix 
        ? `${baseFileName}-${type}-mapper`
        : `${baseFileName}-mapper`;
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Limpiar caracteres especiales para nombres de clase válidos
      const cleanFormattedType = formattedFieldType.replace(/[\[\]]/g, 'Array');
      const className = cleanFormattedType.endsWith('Response') || cleanFormattedType.endsWith('Request') 
        ? `${cleanFormattedType}Mapper` 
        : `${cleanFormattedType}${suffix}Mapper`;

      nestedMappers.push({
        className,
        fileName
      });

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }

  return nestedMappers;
}

async function generateBusinessInjectionFiles(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    const serviceNameKebab = serviceName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    // 1. Use Case Injection
    const useCaseImports = schema.businessOperations
      .filter(operation => operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
        const operationKebab = operationName.replace(/_/g, '-');
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return `import { ${toPascalCase(serviceName)}${cleanOperationName}UseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/business/${serviceName.toLowerCase()}/${operationName}/${serviceNameKebab}-${operationKebab}-use-case";`;
      }).join('\n');

    const useCaseMethods = schema.businessOperations
      .filter(operation => operation.fields && operation.fields.length > 0 && operation.responseFields && operation.responseFields.length > 0)
      .map(operation => {
        const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
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

    // 2. Facade Injection
    const facadeInjection = `import { ${toPascalCase(serviceName)}Facade } from "@${apiName}/facade/apis/${apiName}/business/${serviceNameKebab}-facade";

export class InjectionPlatformBusiness${toPascalCase(serviceName)}Facade {
  public static ${toPascalCase(serviceName)}Facade(): ${toPascalCase(serviceName)}Facade {
    return ${toPascalCase(serviceName)}Facade.getInstance();
  }
}`;

    await fs.writeFile(
      path.join(paths.injectionFacades, `injection-${apiName}-business-${serviceNameKebab}-facade.ts`),
      facadeInjection
    );
    console.log(chalk.green(`✅ Facade Injection: injection-${apiName}-business-${serviceNameKebab}-facade.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron archivos de inyección porque no hay operaciones de negocio detectadas.'));
  }
}
