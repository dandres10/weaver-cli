import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import {
  ResponseSchema,
  EntityField,
  Operation,
} from "../parsers/swagger-redux-parser";

/**
 * Opciones para la generación del flujo Redux
 */
export interface ReduxFlowOptions {
  flowName: string; // ← Nombre del flujo Redux (ej: "user-preferences", "services-by-location")
  isArray: boolean; // ← DECISIÓN DEL USUARIO (no del parser)
  idField: string | null; // ← Campo ID seleccionado (solo para arrays)
}

/**
 * Información del generador Redux
 */
interface ReduxGenerationInfo {
  flowName: string; // ej: "user-preferences", "services-by-location"
  flowNamePascal: string; // ej: "UserPreferences", "ServicesByLocation"
  flowNameCamel: string; // ej: "userPreferences", "servicesByLocation"
  apiName: string;
  apiNamePascal: string;
  apiNameCamel: string;
  isArray: boolean;
  idField: string | null;
}

/**
 * Genera todo el flujo Redux basándose en el response de una operación
 * @param targetBasePath - Path base donde generar archivos
 * @param responseSchema - Schema del response parseado del Swagger
 * @param apiName - Nombre de la API (platform, appointment, etc.)
 * @param options - Opciones del flujo Redux (incluye nombre, tipo de storage, ID field)
 */
export async function createReduxFlow(
  targetBasePath: string,
  responseSchema: ResponseSchema,
  apiName: string,
  options: ReduxFlowOptions
): Promise<void> {
  // Crear info simplificada
  const flowNameKebab = toKebabCase(options.flowName);
  const flowNamePascal = toPascalCase(options.flowName);
  const flowNameCamel = toCamelCase(options.flowName);

  const info: ReduxGenerationInfo = {
    flowName: flowNameKebab,
    flowNamePascal: flowNamePascal,
    flowNameCamel: flowNameCamel,
    apiName: apiName,
    apiNamePascal: toPascalCase(apiName),
    apiNameCamel: toCamelCase(apiName),
    isArray: options.isArray,
    idField: options.idField,
  };

  console.log(chalk.blue(`\n📦 Generando flujo Redux: ${flowNamePascal}`));
  console.log(chalk.gray(`   API: ${apiName}`));
  console.log(
    chalk.gray(
      `   Storage: ${options.isArray ? "Lista (Array)" : "Objeto único"}`
    )
  );
  if (options.idField)
    console.log(chalk.gray(`   Campo ID: ${options.idField}`));
  console.log(chalk.gray(`   Target: ${targetBasePath}`));

  try {
    // 1. Generar Core Files
    await generateReduxCoreFiles(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Core files"));

    // 2. Generar DTOs Redux
    await generateReduxDTOs(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Redux DTOs"));

    // 3. Generar/Actualizar Repository Interface
    await generateReduxRepositoryInterface(
      targetBasePath,
      info,
      responseSchema
    );
    console.log(chalk.green("  ✓ Repository Interface"));

    // 4. Generar Use Cases
    await generateReduxUseCases(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Use Cases"));

    // 5. Generar/Actualizar Facade
    await generateReduxFacade(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Facade"));

    // 6. Generar/Actualizar Redux Slice
    await generateReduxSlice(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Redux Slice"));

    // 7. Generar Reducers
    await generateReduxReducers(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Reducers"));

    // 8. Generar Repository Implementation
    await generateReduxRepository(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Repository Implementation"));

    // 9. Generar Mappers (opcional)
    await generateReduxMappers(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Mappers"));

    // 10. Generar Archivos de Injection
    await generateReduxInjectionFiles(targetBasePath, info, responseSchema);
    console.log(chalk.green("  ✓ Injection files"));

    // 11. Registrar en redux-core.ts (solo primera vez)
    await registerInReduxCore(targetBasePath, info);
    console.log(chalk.green("  ✓ Redux Core registration"));

    console.log(
      chalk.green(
        `\n✅ Flujo Redux generado: ~${options.isArray ? "20" : "21"} archivos`
      )
    );
    console.log(chalk.cyan(`\n💡 Uso:`));
    console.log(
      chalk.gray(
        `   import { Injection${info.apiNamePascal}ReduxFacade } from '@${apiName}/facade/redux/${apiName}/injection';`
      )
    );
    console.log(
      chalk.gray(
        `   const facade = Injection${info.apiNamePascal}ReduxFacade.${info.apiNamePascal}ReduxFacade();`
      )
    );
    if (info.isArray) {
      console.log(
        chalk.gray(
          `   facade.create${info.flowNamePascal}(data, { dispatch });`
        )
      );
    } else {
      console.log(
        chalk.gray(
          `   facade.save${info.flowNamePascal}(data, { dispatch });`
        )
      );
    }
  } catch (error) {
    console.error(chalk.red("❌ Error generando flujo Redux:"), error);
    throw error;
  }
}


/**
 * Convierte un string a PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Convierte un string a camelCase
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Construye el path relativo para un flow Redux
 * Ejemplo: "user-preferences" o "services-by-location"
 */
function buildFlowPath(info: ReduxGenerationInfo): string {
  return `custom/${info.flowName}`;
}

/**
 * Convierte un string a kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Convierte de camelCase a snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
}

// ========================================
// FUNCIONES DE GENERACIÓN ESPECÍFICAS
// ========================================

/**
 * Genera archivos core (interfaces, types)
 */
async function generateReduxCoreFiles(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const corePath = path.join(basePath, "core");

  // 1. Generar i-config-repository-dto.ts (si no existe)
  const configPath = path.join(
    corePath,
    "interfaces",
    "i-config-repository-dto.ts"
  );

  if (!(await fs.pathExists(configPath))) {
    const configContent = `import { TypedUseSelectorHook } from 'react-redux';
import { Selector${info.apiNamePascal}Redux } from '../types/selector-${info.apiNameCamel}-redux';

export interface IConfigDTO {
    loadService?: boolean;
    dispatch?: any; // AppDispatch
    selector?: Selector${info.apiNamePascal}Redux;
    key?: string;
}
`;
    await fs.ensureDir(path.dirname(configPath));
    await fs.writeFile(configPath, configContent);
  }

  // 2. Generar selector-{api-name}-redux.ts (si no existe)
  const selectorPath = path.join(
    corePath,
    "types",
    `selector-${info.apiNameCamel}-redux.ts`
  );

  if (!(await fs.pathExists(selectorPath))) {
    const selectorContent = `import { TypedUseSelectorHook } from 'react-redux';
import { I${info.apiNamePascal}InitialStateReduxDTO } from '@${info.apiName}/infrastructure/repositories/redux/${info.apiName}/${info.apiName}.slice';

type RootState = {
  ${info.apiNameCamel}: I${info.apiNamePascal}InitialStateReduxDTO;
};

export type Selector${info.apiNamePascal}Redux = TypedUseSelectorHook<RootState>;
`;
    await fs.ensureDir(path.dirname(selectorPath));
    await fs.writeFile(selectorPath, selectorContent);
  }
}

/**
 * Genera los DTOs de Redux
 */
async function generateReduxDTOs(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const flowPath = buildFlowPath(info);

  const dtoPath = path.join(
    basePath,
    "domain/models/redux",
    info.apiName,
    flowPath
  );

  await fs.ensureDir(dtoPath);

  // Generar interface principal
  const dtoContent = generateDTOInterface(info, schema);
  await fs.writeFile(
    path.join(dtoPath, `i-${info.flowName}-redux-dto.ts`),
    dtoContent
  );

  // Generar index.ts
  const indexContent = `export * from './i-${info.flowName}-redux-dto';
`;
  await fs.writeFile(path.join(dtoPath, "index.ts"), indexContent);
}

/**
 * Genera las interfaces del DTO de forma recursiva
 */
function generateDTOInterface(
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): string {
  const nestedInterfaces: string[] = [];
  const processedTypes = new Set<string>();
  
  // Generar la interface principal
  const mainFields = schema.fields
    .map((field) => {
      const fieldType = mapFieldTypeToTypescriptRecursive(
        field,
        info.flowNamePascal,
        nestedInterfaces,
        processedTypes
      );
      const fieldNameCamel = toCamelCase(field.name);
      return `  ${fieldNameCamel}?: ${fieldType};`;
    })
    .join("\n");

  const mainInterface = `/**
 * Redux DTO para ${info.flowNamePascal}
 * Path: domain/models/redux/${info.apiName}/custom/${info.flowName}/
 */

export interface I${info.flowNamePascal}ReduxDTO {
${mainFields}
}`;

  // Retornar la interface principal seguida de las interfaces anidadas
  if (nestedInterfaces.length > 0) {
    return `${mainInterface}\n\n${nestedInterfaces.join("\n\n")}`;
  }
  
  return mainInterface;
}

/**
 * Mapea un campo a su tipo TypeScript de forma recursiva, generando interfaces anidadas
 */
function mapFieldTypeToTypescriptRecursive(
  field: EntityField,
  parentName: string,
  nestedInterfaces: string[],
  processedTypes: Set<string>
): string {
  let baseType = field.type;

  // Si tiene campos anidados (es un objeto con propiedades)
  if (field.nestedFields && field.nestedFields.length > 0) {
    // Generar nombre de la interface anidada con sufijo ReduxDTO
    const fieldNamePascal = toPascalCase(field.name);
    const nestedInterfaceName = `I${fieldNamePascal}ReduxDTO`;
    
    // Evitar duplicados
    if (!processedTypes.has(nestedInterfaceName)) {
      processedTypes.add(nestedInterfaceName);
      
      // Generar campos de la interface anidada recursivamente
      const nestedFields = field.nestedFields
        .map((nestedField) => {
          const nestedFieldType = mapFieldTypeToTypescriptRecursive(
            nestedField,
            nestedInterfaceName,
            nestedInterfaces,
            processedTypes
          );
          const nestedFieldNameCamel = toCamelCase(nestedField.name);
          return `  ${nestedFieldNameCamel}?: ${nestedFieldType};`;
        })
        .join("\n");

      // Agregar la interface anidada
      nestedInterfaces.push(
        `export interface ${nestedInterfaceName} {\n${nestedFields}\n}`
      );
    }
    
    baseType = nestedInterfaceName;
  } else {
    // Mapear tipos básicos
    if (baseType === "string") baseType = "string";
    else if (baseType === "number" || baseType === "integer") baseType = "number";
    else if (baseType === "boolean") baseType = "boolean";
    else if (baseType === "object") baseType = "any";
    else baseType = "any";
  }

  // Manejar arrays
  if (field.isArray) {
    return `${baseType}[]`;
  }

  return baseType;
}

/**
 * Mapea un campo a su tipo TypeScript
 */
function mapFieldTypeToTypescript(field: EntityField): string {
  let baseType = field.type;

  // Mapear tipos básicos
  if (baseType === "string") baseType = "string";
  else if (baseType === "number" || baseType === "integer") baseType = "number";
  else if (baseType === "boolean") baseType = "boolean";
  else if (baseType === "any" || baseType === "object") baseType = "any";

  // Si es array
  if (field.isArray) {
    return `${baseType}[]`;
  }

  return baseType;
}

/**
 * Genera o actualiza la interface del repositorio Redux
 */
async function generateReduxRepositoryInterface(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const repositoryName = info.flowName;

  const repoPath = path.join(
    basePath,
    "domain/services/repositories/redux",
    info.apiName,
    "custom",
    `i-${repositoryName}-redux-repository.ts`
  );

  const methodsContent = info.isArray
    ? generateArrayRepositoryMethods(info)
    : generateObjectRepositoryMethods(info);

  if (await fs.pathExists(repoPath)) {
    // Actualizar archivo existente agregando métodos
    let content = await fs.readFile(repoPath, "utf-8");

    // Buscar el cierre de la clase para agregar antes
    const classEndPattern = /}\s*$/;
    if (classEndPattern.test(content)) {
      content = content.replace(classEndPattern, `\n${methodsContent}\n}`);
      await fs.writeFile(repoPath, content);
    }
  } else {
    // Crear archivo nuevo
    const flowPath = buildFlowPath(info);
    const repositoryClassName = info.flowNamePascal;

    const repoContent = `import { IConfigDTO } from '@${info.apiName}/core/interfaces';
import { I${info.flowNamePascal}ReduxDTO } from '@${info.apiName}/domain/models/redux/${info.apiName}/${flowPath}';

/**
 * Interface del repositorio Redux para ${repositoryClassName}
 * Path: domain/services/repositories/redux/${info.apiName}/custom/i-${repositoryName}-redux-repository.ts
 */
export abstract class I${repositoryClassName}ReduxRepository {
${methodsContent}
}
`;
    await fs.ensureDir(path.dirname(repoPath));
    await fs.writeFile(repoPath, repoContent);
  }
}

function generateArrayRepositoryMethods(info: ReduxGenerationInfo): string {
  return `    abstract create${info.flowNamePascal}(params: I${
    info.flowNamePascal
  }ReduxDTO, config: IConfigDTO): void;
    
    abstract read${
      info.flowNamePascal
    }ById(id: string, config: IConfigDTO): I${
    info.flowNamePascal
  }ReduxDTO | null;
    
    abstract readAll${info.flowNamePascal}(config: IConfigDTO): I${
    info.flowNamePascal
  }ReduxDTO[] | null;
    
    abstract update${info.flowNamePascal}(id: string, data: Partial<I${
    info.flowNamePascal
  }ReduxDTO>, config: IConfigDTO): void;
    
    abstract delete${
      info.flowNamePascal
    }(id: string, config: IConfigDTO): void;
    
    abstract clearAll${info.flowNamePascal}(config: IConfigDTO): void;
`;
}

function generateObjectRepositoryMethods(info: ReduxGenerationInfo): string {
  return `    abstract save${info.flowNamePascal}(params: I${
    info.flowNamePascal
  }ReduxDTO, config: IConfigDTO): void;
    
    abstract read${info.flowNamePascal}(config: IConfigDTO): I${
    info.flowNamePascal
  }ReduxDTO | null;
    
    abstract read${info.flowNamePascal}Property<K extends keyof I${
    info.flowNamePascal
  }ReduxDTO>(
        propertyName: K, 
        config: IConfigDTO
    ): I${info.flowNamePascal}ReduxDTO[K] | null;
    
    abstract update${info.flowNamePascal}(data: Partial<I${
    info.flowNamePascal
  }ReduxDTO>, config: IConfigDTO): void;
    
    abstract clear${info.flowNamePascal}(config: IConfigDTO): void;
`;
}

// Las siguientes funciones serán implementadas en las siguientes iteraciones...
// Por ahora, creo stubs básicos para que compile

async function generateReduxUseCases(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const flowPath = buildFlowPath(info);

  const useCasePath = path.join(
    basePath,
    "domain/services/use_cases/redux",
    info.apiName,
    flowPath
  );

  await fs.ensureDir(useCasePath);

  if (info.isArray) {
    // Generar use cases para arrays
    await generateArrayUseCases(useCasePath, info);
  } else {
    // Generar use cases para objetos
    await generateObjectUseCases(useCasePath, info);
  }

  // Generar injection de use cases
  await generateUseCaseInjection(useCasePath, info);
}

async function generateArrayUseCases(
  useCasePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  // 1. Create Use Case
  const createContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Create${info.flowNamePascal}UseCase implements UseCase<I${
    info.flowNamePascal
  }ReduxDTO, void> {
    private static instance: Create${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Create${info.flowNamePascal}UseCase {
        if (!Create${info.flowNamePascal}UseCase.instance)
            Create${info.flowNamePascal}UseCase.instance = new Create${
    info.flowNamePascal
  }UseCase();
        return Create${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.create${
    info.flowNamePascal
  }(param, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `create-${info.flowName}-use-case.ts`),
    createContent
  );

  // 2. Read Use Case
  const readContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Read${
    info.flowNamePascal
  }UseCase implements UseCase<string | null, I${
    info.flowNamePascal
  }ReduxDTO | I${info.flowNamePascal}ReduxDTO[] | null> {
    private static instance: Read${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Read${info.flowNamePascal}UseCase {
        if (!Read${info.flowNamePascal}UseCase.instance)
            Read${info.flowNamePascal}UseCase.instance = new Read${
    info.flowNamePascal
  }UseCase();
        return Read${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: string | null, config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | I${info.flowNamePascal}ReduxDTO[] | null {
        if (param) {
            return this.${info.flowNameCamel}ReduxRepository.read${
    info.flowNamePascal
  }ById(param, config);
        } else {
            return this.${info.flowNameCamel}ReduxRepository.readAll${
    info.flowNamePascal
  }(config);
        }
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `read-${info.flowName}-use-case.ts`),
    readContent
  );

  // 3. Update Use Case
  const updateContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Update${
    info.flowNamePascal
  }UseCase implements UseCase<{ id: string; data: Partial<I${
    info.flowNamePascal
  }ReduxDTO> }, void> {
    private static instance: Update${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Update${info.flowNamePascal}UseCase {
        if (!Update${info.flowNamePascal}UseCase.instance)
            Update${info.flowNamePascal}UseCase.instance = new Update${
    info.flowNamePascal
  }UseCase();
        return Update${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: { id: string; data: Partial<I${
      info.flowNamePascal
    }ReduxDTO> }, config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.update${
    info.flowNamePascal
  }(param.id, param.data, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `update-${info.flowName}-use-case.ts`),
    updateContent
  );

  // 4. Delete Use Case
  const deleteContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { InjectionRepositoriesRedux } from "@${info.apiName}/infrastructure/repositories/redux/${info.apiName}/injection";

export class Delete${info.flowNamePascal}UseCase implements UseCase<string, void> {
    private static instance: Delete${info.flowNamePascal}UseCase;
    private ${info.apiNameCamel}ReduxRepository = InjectionRepositoriesRedux.${info.apiNamePascal}ReduxRepository();

    public static getInstance(): Delete${info.flowNamePascal}UseCase {
        if (!Delete${info.flowNamePascal}UseCase.instance)
            Delete${info.flowNamePascal}UseCase.instance = new Delete${info.flowNamePascal}UseCase();
        return Delete${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: string, config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.delete${info.flowNamePascal}(param, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `delete-${info.flowName}-use-case.ts`),
    deleteContent
  );

  // 5. Clear Use Case
  const clearContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { InjectionRepositoriesRedux } from "@${info.apiName}/infrastructure/repositories/redux/${info.apiName}/injection";

export class Clear${info.flowNamePascal}UseCase implements UseCase<any, void> {
    private static instance: Clear${info.flowNamePascal}UseCase;
    private ${info.apiNameCamel}ReduxRepository = InjectionRepositoriesRedux.${info.apiNamePascal}ReduxRepository();

    public static getInstance(): Clear${info.flowNamePascal}UseCase {
        if (!Clear${info.flowNamePascal}UseCase.instance)
            Clear${info.flowNamePascal}UseCase.instance = new Clear${info.flowNamePascal}UseCase();
        return Clear${info.flowNamePascal}UseCase.instance;
    }

    public execute(config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.clearAll${info.flowNamePascal}(config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `clear-${info.flowName}-use-case.ts`),
    clearContent
  );
}

async function generateObjectUseCases(
  useCasePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  // 1. Save Use Case
  const saveContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Save${info.flowNamePascal}UseCase implements UseCase<I${
    info.flowNamePascal
  }ReduxDTO, void> {
    private static instance: Save${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Save${info.flowNamePascal}UseCase {
        if (!Save${info.flowNamePascal}UseCase.instance)
            Save${info.flowNamePascal}UseCase.instance = new Save${
    info.flowNamePascal
  }UseCase();
        return Save${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.save${
    info.flowNamePascal
  }(param, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `save-${info.flowName}-use-case.ts`),
    saveContent
  );

  // 2. Read Use Case
  const readContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Read${info.flowNamePascal}UseCase implements UseCase<void, I${
    info.flowNamePascal
  }ReduxDTO | null> {
    private static instance: Read${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Read${info.flowNamePascal}UseCase {
        if (!Read${info.flowNamePascal}UseCase.instance)
            Read${info.flowNamePascal}UseCase.instance = new Read${
    info.flowNamePascal
  }UseCase();
        return Read${info.flowNamePascal}UseCase.instance;
    }

    public execute(config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | null {
        return this.${info.flowNameCamel}ReduxRepository.read${
    info.flowNamePascal
  }(config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `read-${info.flowName}-use-case.ts`),
    readContent
  );

  // 3. Read Property Use Case (genérico)
  const readPropertyContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Read${
    info.flowNamePascal
  }PropertyUseCase implements UseCase<string, any> {
    private static instance: Read${info.flowNamePascal}PropertyUseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Read${info.flowNamePascal}PropertyUseCase {
        if (!Read${info.flowNamePascal}PropertyUseCase.instance)
            Read${info.flowNamePascal}PropertyUseCase.instance = new Read${
    info.flowNamePascal
  }PropertyUseCase();
        return Read${info.flowNamePascal}PropertyUseCase.instance;
    }

    public execute<K extends keyof I${info.flowNamePascal}ReduxDTO>(
        propertyName: K, 
        config: IConfigDTO
    ): I${info.flowNamePascal}ReduxDTO[K] | null {
        return this.${info.flowNameCamel}ReduxRepository.read${
    info.flowNamePascal
  }Property(propertyName, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `read-${info.flowName}-property-use-case.ts`),
    readPropertyContent
  );

  // 4. Update Use Case
  const updateContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { InjectionRepositoriesRedux } from "@${
    info.apiName
  }/infrastructure/repositories/redux/injection";

export class Update${
    info.flowNamePascal
  }UseCase implements UseCase<Partial<I${
    info.flowNamePascal
  }ReduxDTO>, void> {
    private static instance: Update${info.flowNamePascal}UseCase;
    private ${info.flowNameCamel}ReduxRepository = InjectionRepositoriesRedux.${
    info.flowNamePascal
  }ReduxRepository();

    public static getInstance(): Update${info.flowNamePascal}UseCase {
        if (!Update${info.flowNamePascal}UseCase.instance)
            Update${info.flowNamePascal}UseCase.instance = new Update${
    info.flowNamePascal
  }UseCase();
        return Update${info.flowNamePascal}UseCase.instance;
    }

    public execute(param: Partial<I${
      info.flowNamePascal
    }ReduxDTO>, config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.update${
    info.flowNamePascal
  }(param, config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `update-${info.flowName}-use-case.ts`),
    updateContent
  );

  // 5. Clear Use Case
  const clearContent = `import { UseCase } from "@bus/core/interfaces/use-case";
import { IConfigDTO } from "@${info.apiName}/core/interfaces";
import { InjectionRepositoriesRedux } from "@${info.apiName}/infrastructure/repositories/redux/${info.apiName}/injection";

export class Clear${info.flowNamePascal}UseCase implements UseCase<any, void> {
    private static instance: Clear${info.flowNamePascal}UseCase;
    private ${info.apiNameCamel}ReduxRepository = InjectionRepositoriesRedux.${info.apiNamePascal}ReduxRepository();

    public static getInstance(): Clear${info.flowNamePascal}UseCase {
        if (!Clear${info.flowNamePascal}UseCase.instance)
            Clear${info.flowNamePascal}UseCase.instance = new Clear${info.flowNamePascal}UseCase();
        return Clear${info.flowNamePascal}UseCase.instance;
    }

    public execute(config: IConfigDTO): void {
        this.${info.flowNameCamel}ReduxRepository.clear${info.flowNamePascal}(config);
    }
}
`;
  await fs.writeFile(
    path.join(useCasePath, `clear-${info.flowName}-use-case.ts`),
    clearContent
  );
}

async function generateUseCaseInjection(
  useCasePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  const injectionPath = path.join(useCasePath, "injection");
  await fs.ensureDir(injectionPath);

  let imports = "";
  let methods = "";

  if (info.isArray) {
    imports = `import { Create${info.flowNamePascal}UseCase } from "../create-${info.flowName}-use-case";
import { Read${info.flowNamePascal}UseCase } from "../read-${info.flowName}-use-case";
import { Update${info.flowNamePascal}UseCase } from "../update-${info.flowName}-use-case";
import { Delete${info.flowNamePascal}UseCase } from "../delete-${info.flowName}-use-case";
import { Clear${info.flowNamePascal}UseCase } from "../clear-${info.flowName}-use-case";
`;

    methods = `    public static Create${info.flowNamePascal}UseCase() { 
        return Create${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Read${info.flowNamePascal}UseCase() { 
        return Read${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Update${info.flowNamePascal}UseCase() { 
        return Update${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Delete${info.flowNamePascal}UseCase() { 
        return Delete${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Clear${info.flowNamePascal}UseCase() { 
        return Clear${info.flowNamePascal}UseCase.getInstance();
    }
`;
  } else {
    imports = `import { Save${info.flowNamePascal}UseCase } from "../save-${info.flowName}-use-case";
import { Read${info.flowNamePascal}UseCase } from "../read-${info.flowName}-use-case";
import { Read${info.flowNamePascal}PropertyUseCase } from "../read-${info.flowName}-property-use-case";
import { Update${info.flowNamePascal}UseCase } from "../update-${info.flowName}-use-case";
import { Clear${info.flowNamePascal}UseCase } from "../clear-${info.flowName}-use-case";
`;

    methods = `    public static Save${info.flowNamePascal}UseCase() { 
        return Save${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Read${info.flowNamePascal}UseCase() { 
        return Read${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Read${info.flowNamePascal}PropertyUseCase() { 
        return Read${info.flowNamePascal}PropertyUseCase.getInstance();
    }
    
    public static Update${info.flowNamePascal}UseCase() { 
        return Update${info.flowNamePascal}UseCase.getInstance();
    }
    
    public static Clear${info.flowNamePascal}UseCase() { 
        return Clear${info.flowNamePascal}UseCase.getInstance();
    }
`;
  }

  const injectionContent = `${imports}
/**
 * Inyección de dependencias para Use Cases de ${info.flowNamePascal} Redux
 */
export class Injection${info.flowNamePascal}ReduxUseCase {
${methods}}
`;

  await fs.writeFile(
    path.join(
      injectionPath,
      `injection-${info.flowName}-redux-use-case.ts`
    ),
    injectionContent
  );
}

async function generateReduxFacade(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const facadePath = path.join(basePath, "facade/redux", info.apiName);

  const facadeFile = path.join(facadePath, `${info.apiName}-redux-facade.ts`);

  // Verificar si el facade ya existe
  if (await fs.pathExists(facadeFile)) {
    // Actualizar facade existente agregando métodos
    await updateExistingFacade(facadeFile, info);
  } else {
    // Crear facade nuevo
    await createNewFacade(facadePath, info);
  }

  // Generar/actualizar injection de facade
  await generateFacadeInjection(facadePath, info);
}

async function createNewFacade(
  facadePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  await fs.ensureDir(facadePath);

  const facadeContent = generateFacadeContent(info, false);

  await fs.writeFile(
    path.join(facadePath, `${info.apiName}-redux-facade.ts`),
    facadeContent
  );
}

async function updateExistingFacade(
  facadeFile: string,
  info: ReduxGenerationInfo
): Promise<void> {
  let content = await fs.readFile(facadeFile, "utf-8");

  // Agregar imports necesarios
  const newImport = `import { I${info.flowNamePascal}ReduxDTO } from '@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}';`;

  if (!content.includes(newImport)) {
    // Buscar el último import y agregar después
    const importPattern = /import.*from.*;\n/g;
    const imports = content.match(importPattern);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, `${lastImport}${newImport}\n`);
    }
  }

  // Agregar import del use case injection
  const useCaseInjectionImport = `import { Injection${
    info.flowNamePascal
  }ReduxUseCase } from '@${info.apiName}/domain/services/use_cases/redux/${
    info.apiName
  }/${info.flowName}/injection';`;

  if (!content.includes(useCaseInjectionImport)) {
    const importPattern = /import.*from.*;\n/g;
    const imports = content.match(importPattern);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(
        lastImport,
        `${lastImport}${useCaseInjectionImport}\n`
      );
    }
  }

  // Agregar propiedades de use cases en la clase
  const useCaseProperties = generateUseCaseProperties(info);
  const constructorPattern = /public static getInstance\(\)/;
  content = content.replace(
    constructorPattern,
    `${useCaseProperties}\n\n    public static getInstance()`
  );

  // Agregar métodos públicos antes del cierre de la clase
  const methods = generateFacadeMethods(info);
  const classEndPattern = /}\s*$/;
  content = content.replace(classEndPattern, `${methods}\n}`);

  await fs.writeFile(facadeFile, content);
}

function generateFacadeContent(
  info: ReduxGenerationInfo,
  isUpdate: boolean
): string {
  const imports = `import { IConfigDTO } from '@${
    info.apiName
  }/core/interfaces';
import { I${info.flowNamePascal}ReduxDTO } from '@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}';
import { Injection${info.flowNamePascal}ReduxUseCase } from '@${
    info.apiName
  }/domain/services/use_cases/redux/${info.apiName}/custom/${info.flowName}/injection';
`;

  const useCaseProperties = generateUseCaseProperties(info);
  const methods = generateFacadeMethods(info);

  return `${imports}
/**
 * Facade para manejar el estado Redux de ${info.apiNamePascal} API
 * Path: facade/redux/${info.apiName}/${info.apiName}-redux-facade.ts
 */
export class ${info.apiNamePascal}ReduxFacade {
    private static instance: ${info.apiNamePascal}ReduxFacade;
    
${useCaseProperties}

    public static getInstance(): ${info.apiNamePascal}ReduxFacade {
        if (!${info.apiNamePascal}ReduxFacade.instance)
            ${info.apiNamePascal}ReduxFacade.instance = new ${info.apiNamePascal}ReduxFacade();
        return ${info.apiNamePascal}ReduxFacade.instance;
    }

${methods}
}
`;
}

function generateUseCaseProperties(info: ReduxGenerationInfo): string {
  if (info.isArray) {
    return `    private create${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Create${info.flowNamePascal}UseCase();
    private read${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Read${info.flowNamePascal}UseCase();
    private update${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Update${info.flowNamePascal}UseCase();
    private delete${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Delete${info.flowNamePascal}UseCase();
    private clear${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Clear${info.flowNamePascal}UseCase();
`;
  } else {
    return `    private save${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Save${info.flowNamePascal}UseCase();
    private read${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Read${info.flowNamePascal}UseCase();
    private read${info.flowNamePascal}PropertyUseCase = Injection${info.flowNamePascal}ReduxUseCase.Read${info.flowNamePascal}PropertyUseCase();
    private update${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Update${info.flowNamePascal}UseCase();
    private clear${info.flowNamePascal}UseCase = Injection${info.flowNamePascal}ReduxUseCase.Clear${info.flowNamePascal}UseCase();
`;
  }
}

function generateFacadeMethods(info: ReduxGenerationInfo): string {
  if (info.isArray) {
    return `    public create${info.flowNamePascal}(params: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        this.create${info.flowNamePascal}UseCase.execute(params, config);
    }

    public read${info.flowNamePascal}(id: string, config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | null {
        return this.read${
          info.flowNamePascal
        }UseCase.execute(id, config) as I${
      info.flowNamePascal
    }ReduxDTO | null;
    }

    public readAll${info.flowNamePascal}(config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO[] | null {
        return this.read${
          info.flowNamePascal
        }UseCase.execute(null, config) as I${
      info.flowNamePascal
    }ReduxDTO[] | null;
    }

    public update${info.flowNamePascal}(id: string, data: Partial<I${
      info.flowNamePascal
    }ReduxDTO>, config: IConfigDTO): void {
        this.update${
          info.flowNamePascal
        }UseCase.execute({ id, data }, config);
    }

    public delete${
      info.flowNamePascal
    }(id: string, config: IConfigDTO): void {
        this.delete${info.flowNamePascal}UseCase.execute(id, config);
    }

    public clearAll${info.flowNamePascal}(config: IConfigDTO): void {
        this.clear${info.flowNamePascal}UseCase.execute(config);
    }
`;
  } else {
    return `    public save${info.flowNamePascal}(params: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        this.save${info.flowNamePascal}UseCase.execute(params, config);
    }

    public read${info.flowNamePascal}(config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | null {
        return this.read${info.flowNamePascal}UseCase.execute(config);
    }

    public read${info.flowNamePascal}Property<K extends keyof I${
      info.flowNamePascal
    }ReduxDTO>(
        propertyName: K, 
        config: IConfigDTO
    ): I${info.flowNamePascal}ReduxDTO[K] | null {
        return this.read${
          info.flowNamePascal
        }PropertyUseCase.execute(propertyName, config);
    }

    public update${info.flowNamePascal}(data: Partial<I${
      info.flowNamePascal
    }ReduxDTO>, config: IConfigDTO): void {
        this.update${info.flowNamePascal}UseCase.execute(data, config);
    }

    public clear${info.flowNamePascal}(config: IConfigDTO): void {
        this.clear${info.flowNamePascal}UseCase.execute(config);
    }
`;
  }
}

async function generateFacadeInjection(
  facadePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  const injectionPath = path.join(facadePath, "injection");
  const injectionFile = path.join(
    injectionPath,
    `injection-${info.apiName}-redux-facade.ts`
  );

  if (await fs.pathExists(injectionFile)) {
    // Ya existe, no tocar (se crea solo una vez)
    return;
  }

  await fs.ensureDir(injectionPath);

  const injectionContent = `import { ${info.apiNamePascal}ReduxFacade } from "../${info.apiName}-redux-facade";

export class Injection${info.apiNamePascal}ReduxFacade {
    public static ${info.apiNamePascal}ReduxFacade() { 
        return ${info.apiNamePascal}ReduxFacade.getInstance();
    }
}
`;

  await fs.writeFile(injectionFile, injectionContent);
}

async function generateReduxSlice(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const slicePath = path.join(
    basePath,
    "infrastructure/repositories/redux",
    info.apiName
  );

  const sliceFile = path.join(slicePath, `${info.apiName}.slice.ts`);

  // Verificar si el slice ya existe
  if (await fs.pathExists(sliceFile)) {
    // Actualizar slice existente
    await updateExistingSlice(sliceFile, info);
  } else {
    // Crear slice nuevo
    await createNewSlice(slicePath, info);
  }
}

async function createNewSlice(
  slicePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  await fs.ensureDir(slicePath);

  const sliceContent = generateSliceContent(info, false);

  await fs.writeFile(
    path.join(slicePath, `${info.apiName}.slice.ts`),
    sliceContent
  );
}

async function updateExistingSlice(
  sliceFile: string,
  info: ReduxGenerationInfo
): Promise<void> {
  let content = await fs.readFile(sliceFile, "utf-8");

  // 1. Agregar import del reducer
  const flowPath = buildFlowPath(info);
  const reducerImport = generateSliceReducerImport(info, flowPath);

  // Verificar si ya existe el import por el nombre del primer reducer
  const firstReducerName = info.isArray 
    ? `create${info.flowNamePascal}Reducer`
    : `save${info.flowNamePascal}Reducer`;
  
  if (!content.includes(firstReducerName)) {
    // Buscar TODOS los bloques de imports de reducers (multilínea)
    const reducerImportPattern = /import\s*\{[^}]+\}\s*from\s*["']\.\/.*\.reducer["'];?/gs;
    const imports = content.match(reducerImportPattern);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, `${lastImport}\n${reducerImport}`);
    } else {
      // Si no hay imports de reducers, agregar después del comentario
      const reducerCommentPattern = /\/\/ Imports de reducers\s*/;
      if (reducerCommentPattern.test(content)) {
        content = content.replace(
          reducerCommentPattern,
          `// Imports de reducers\n${reducerImport}`
        );
      }
    }
  }

  // 2. Agregar import del DTO
  const dtoImport = `import { I${info.flowNamePascal}ReduxDTO } from "@${info.apiName}/domain/models/redux/${info.apiName}/${flowPath}";`;

  // Verificar si ya existe el import del DTO por su nombre
  if (!content.includes(`I${info.flowNamePascal}ReduxDTO`)) {
    // Buscar la sección de imports de DTOs y agregar
    const dtoImportPattern = /import.*ReduxDTO.*from.*domain\/models\/redux[^\n]*/g;
    const dtoImports = content.match(dtoImportPattern);
    if (dtoImports && dtoImports.length > 0) {
      const lastDtoImport = dtoImports[dtoImports.length - 1];
      content = content.replace(
        lastDtoImport,
        `${lastDtoImport}\n${dtoImport}`
      );
    }
  }

  // 3. Agregar property al interface del state
  const stateProperty = `  ${info.flowNameCamel}: I${
    info.flowNamePascal
  }ReduxDTO${info.isArray ? "[]" : ""} | null;`;
  const interfacePattern = new RegExp(
    `export interface I${info.apiNamePascal}InitialStateReduxDTO \\{[^}]*\\}`,
    "s"
  );
  const interfaceMatch = content.match(interfacePattern);

  if (
    interfaceMatch &&
    !content.includes(`${info.flowNameCamel}:`)
  ) {
    const interfaceContent = interfaceMatch[0];
    const newInterfaceContent = interfaceContent.replace(
      "}",
      `${stateProperty}\n}`
    );
    content = content.replace(interfaceContent, newInterfaceContent);
  }

  // 4. Agregar property al initialState
  const initialStateProperty = `  ${info.flowNameCamel}: null,`;
  const initialStatePattern = /const initialState: .*\{[\s\S]*?\};/;
  const initialStateMatch = content.match(initialStatePattern);

  if (
    initialStateMatch &&
    !content.includes(`${info.flowNameCamel}: null`)
  ) {
    const initialStateContent = initialStateMatch[0];
    const newInitialStateContent = initialStateContent.replace(
      "};",
      `${initialStateProperty}\n};`
    );
    content = content.replace(initialStateContent, newInitialStateContent);
  }

  // 5. Agregar reducers al slice
  const reducerActions = generateSliceReducerActions(info);
  const reducersPattern = /reducers: \{[\s\S]*?\}/;
  const reducersMatch = content.match(reducersPattern);

  if (reducersMatch) {
    const reducersContent = reducersMatch[0];
    const newReducersContent = reducersContent.replace(
      "}",
      `${reducerActions}\n  }`
    );
    content = content.replace(reducersContent, newReducersContent);
  }

  await fs.writeFile(sliceFile, content);
}

function generateSliceContent(
  info: ReduxGenerationInfo,
  isUpdate: boolean
): string {
  const flowPath = buildFlowPath(info);
  const reducerImport = generateSliceReducerImport(info, flowPath);
  const dtoImport = `import { I${info.flowNamePascal}ReduxDTO } from "@${info.apiName}/domain/models/redux/${info.apiName}/${flowPath}";`;

  const reducerActions = generateSliceReducerActions(info);

  return `import { createSlice } from "@reduxjs/toolkit";

// Imports de reducers
${reducerImport}

// Imports de DTOs
${dtoImport}

/**
 * Key para identificar el slice en el store global
 */
export const key${info.apiNamePascal} = "${info.apiName}";

/**
 * Interface del estado inicial del slice
 */
export interface I${info.apiNamePascal}InitialStateReduxDTO {
  ${info.flowNameCamel}: I${info.flowNamePascal}ReduxDTO${
    info.isArray ? "[]" : ""
  } | null;
}

/**
 * Estado inicial del slice
 */
const initialState: I${info.apiNamePascal}InitialStateReduxDTO = {
  ${info.flowNameCamel}: null,
};

/**
 * Slice de Redux Toolkit para ${info.apiNamePascal} API
 */
export const ${info.apiNameCamel}Slice = createSlice({
  name: key${info.apiNamePascal},
  initialState,
  reducers: {
${reducerActions}
  },
});
`;
}

function generateSliceReducerImport(
  info: ReduxGenerationInfo,
  flowPath: string
): string {
  if (info.isArray) {
    return `import {
  create${info.flowNamePascal}Reducer,
  update${info.flowNamePascal}Reducer,
  delete${info.flowNamePascal}Reducer,
  setAll${info.flowNamePascal}Reducer,
  clearAll${info.flowNamePascal}Reducer
} from "./${flowPath}/${info.flowName}.reducer";
`;
  } else {
    return `import {
  save${info.flowNamePascal}Reducer,
  update${info.flowNamePascal}Reducer,
  clear${info.flowNamePascal}Reducer
} from "./${flowPath}/${info.flowName}.reducer";
`;
  }
}

function generateSliceReducerActions(info: ReduxGenerationInfo): string {
  if (info.isArray) {
    return `    // ${info.flowNamePascal} (Array)
    create${info.flowNamePascal}Action: create${info.flowNamePascal}Reducer,
    update${info.flowNamePascal}Action: update${info.flowNamePascal}Reducer,
    delete${info.flowNamePascal}Action: delete${info.flowNamePascal}Reducer,
    setAll${info.flowNamePascal}Action: setAll${info.flowNamePascal}Reducer,
    clearAll${info.flowNamePascal}Action: clearAll${info.flowNamePascal}Reducer,`;
  } else {
    return `    // ${info.flowNamePascal} (Object)
    save${info.flowNamePascal}Action: save${info.flowNamePascal}Reducer,
    update${info.flowNamePascal}Action: update${info.flowNamePascal}Reducer,
    clear${info.flowNamePascal}Action: clear${info.flowNamePascal}Reducer,`;
  }
}

async function generateReduxReducers(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const flowPath = buildFlowPath(info);

  const reducerPath = path.join(
    basePath,
    "infrastructure/repositories/redux",
    info.apiName,
    flowPath
  );

  await fs.ensureDir(reducerPath);

  const reducerContent = info.isArray
    ? generateArrayReducers(info)
    : generateObjectReducers(info);

  await fs.writeFile(
    path.join(reducerPath, `${info.flowName}.reducer.ts`),
    reducerContent
  );
}

function generateArrayReducers(info: ReduxGenerationInfo): string {
  const idField = info.idField || "id";

  return `import { PayloadAction } from "@reduxjs/toolkit";
import { I${info.apiNamePascal}InitialStateReduxDTO } from "../../${
    info.apiName
  }.slice";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";

/**
 * Reducers para ${info.flowNamePascal} (Array)
 * Path: infrastructure/repositories/redux/${info.apiName}/custom/${info.flowName}/${info.flowName}.reducer.ts
 */

/**
 * Reducer: Crear/Agregar un ${info.flowNamePascal} al array
 */
export const create${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<I${info.flowNamePascal}ReduxDTO>
) => {
    if (!state.${info.flowNameCamel}) {
        state.${info.flowNameCamel} = [action.payload];
    } else {
        state.${info.flowNameCamel}.push(action.payload);
    }
};

/**
 * Reducer: Actualizar un ${info.flowNamePascal} específico en el array
 */
export const update${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<{ id: string; data: Partial<I${
      info.flowNamePascal
    }ReduxDTO> }>
) => {
    if (state.${info.flowNameCamel}) {
        const index = state.${info.flowNameCamel}.findIndex(item => item.${idField} === action.payload.id);
        if (index !== -1) {
            state.${info.flowNameCamel}[index] = { ...state.${info.flowNameCamel}[index], ...action.payload.data };
        }
    }
};

/**
 * Reducer: Eliminar un ${info.flowNamePascal} específico del array
 */
export const delete${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<string>
) => {
    if (state.${info.flowNameCamel}) {
        state.${info.flowNameCamel} = state.${info.flowNameCamel}.filter(item => item.${idField} !== action.payload);
    }
};

/**
 * Reducer: Reemplazar todo el array de ${info.flowNamePascal}
 * Útil para cargar datos iniciales del servidor
 */
export const setAll${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<I${info.flowNamePascal}ReduxDTO[] | null>
) => {
    state.${info.flowNameCamel} = action.payload;
};

/**
 * Reducer: Limpiar todo el array de ${info.flowNamePascal}
 */
export const clearAll${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO
) => {
    state.${info.flowNameCamel} = null;
};
`;
}

function generateObjectReducers(info: ReduxGenerationInfo): string {
  return `import { PayloadAction } from "@reduxjs/toolkit";
import { I${info.apiNamePascal}InitialStateReduxDTO } from "../../${
    info.apiName
  }.slice";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";

/**
 * Reducers para ${info.flowNamePascal} (Objeto)
 * Path: infrastructure/repositories/redux/${info.apiName}/custom/${info.flowName}/${info.flowName}.reducer.ts
 */

/**
 * Reducer: Guardar/reemplazar el objeto ${info.flowNamePascal} completo
 */
export const save${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<I${info.flowNamePascal}ReduxDTO>
) => {
    state.${info.flowNameCamel} = action.payload;
};

/**
 * Reducer: Actualizar parcialmente el objeto ${info.flowNamePascal}
 */
export const update${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO,
    action: PayloadAction<Partial<I${info.flowNamePascal}ReduxDTO>>
) => {
    if (state.${info.flowNameCamel}) {
        state.${info.flowNameCamel} = { ...state.${info.flowNameCamel}, ...action.payload };
    } else {
        // Si no existe, crear nuevo objeto con los datos parciales
        state.${info.flowNameCamel} = action.payload as I${
    info.flowNamePascal
  }ReduxDTO;
    }
};

/**
 * Reducer: Limpiar el objeto ${info.flowNamePascal}
 */
export const clear${info.flowNamePascal}Reducer = (
    state: I${info.apiNamePascal}InitialStateReduxDTO
) => {
    state.${info.flowNameCamel} = null;
};
`;
}

async function generateReduxRepository(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  const repositoryName = info.flowName;

  const repositoryPath = path.join(
    basePath,
    "infrastructure/repositories/redux",
    info.apiName,
    "custom",
    info.flowName
  );

  const repositoryFile = path.join(
    repositoryPath,
    `${repositoryName}-redux-repository.ts`
  );

  if (await fs.pathExists(repositoryFile)) {
    await updateExistingRepository(repositoryFile, info);
  } else {
    await createNewRepository(repositoryPath, repositoryName, info);
  }

  await generateRepositoryInjection(repositoryPath, repositoryName, info);
}

async function createNewRepository(
  repositoryPath: string,
  repositoryName: string,
  info: ReduxGenerationInfo
): Promise<void> {
  await fs.ensureDir(repositoryPath);

  const repositoryContent = generateRepositoryContent(info, false);

  await fs.writeFile(
    path.join(repositoryPath, `${repositoryName}-redux-repository.ts`),
    repositoryContent
  );
}

async function updateExistingRepository(
  repositoryFile: string,
  info: ReduxGenerationInfo
): Promise<void> {
  let content = await fs.readFile(repositoryFile, "utf-8");

  // 1. Agregar imports necesarios
  const dtoImport = `import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";`;

  if (!content.includes(dtoImport)) {
    const importPattern = /import.*from.*;\n/g;
    const imports = content.match(importPattern);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, `${lastImport}${dtoImport}\n`);
    }
  }

  // 2. Actualizar destructuring de actions del slice
  const newActions = getActionNamesForDestruct(info);
  const destructPattern = /const \{([^}]+)\} = .*Slice\.actions;/;
  const destructMatch = content.match(destructPattern);

  if (destructMatch) {
    const existingActions = destructMatch[1];
    const updatedActions = `${existingActions.trim()},\n  ${newActions}`;
    content = content.replace(
      destructMatch[0],
      `const {${updatedActions}\n} = ${info.apiNameCamel}Slice.actions;`
    );
  }

  // 3. Agregar métodos antes del cierre de la clase
  const methods = generateRepositoryMethods(info);
  const classEndPattern = /}\s*$/;
  content = content.replace(classEndPattern, `${methods}\n}`);

  await fs.writeFile(repositoryFile, content);
}

function getActionNamesForDestruct(info: ReduxGenerationInfo): string {
  if (info.isArray) {
    return `// ${info.flowNamePascal} actions
  create${info.flowNamePascal}Action,
  update${info.flowNamePascal}Action,
  delete${info.flowNamePascal}Action,
  setAll${info.flowNamePascal}Action,
  clearAll${info.flowNamePascal}Action`;
  } else {
    return `// ${info.flowNamePascal} actions
  save${info.flowNamePascal}Action,
  update${info.flowNamePascal}Action,
  clear${info.flowNamePascal}Action`;
  }
}

function generateRepositoryContent(
  info: ReduxGenerationInfo,
  isUpdate: boolean
): string {
  const imports = `import { IConfigDTO } from "@${
    info.apiName
  }/core/interfaces";
import { I${info.flowNamePascal}ReduxDTO } from "@${
    info.apiName
  }/domain/models/redux/${info.apiName}/custom/${info.flowName}";
import { I${info.flowNamePascal}ReduxRepository } from "@${
    info.apiName
  }/domain/services/repositories/redux/${info.apiName}/custom/i-${
    info.flowName
  }-redux-repository";
import { ${info.apiNameCamel}Slice } from "../../${info.apiName}.slice";
`;

  const actionsDestruct = `const {
  ${getActionNamesForDestruct(info)}
} = ${info.apiNameCamel}Slice.actions;
`;

  const methods = generateRepositoryMethods(info);

  return `${imports}
${actionsDestruct}

export class ${info.flowNamePascal}ReduxRepository extends I${info.flowNamePascal}ReduxRepository {
    private static instance: ${info.flowNamePascal}ReduxRepository;

    public static getInstance(): ${info.flowNamePascal}ReduxRepository {
        if (!${info.flowNamePascal}ReduxRepository.instance)
            ${info.flowNamePascal}ReduxRepository.instance = new ${info.flowNamePascal}ReduxRepository();
        return ${info.flowNamePascal}ReduxRepository.instance;
    }

${methods}
}
`;
}

function generateRepositoryMethods(info: ReduxGenerationInfo): string {
  if (info.isArray) {
    const idField = info.idField || "id";
    return `    public create${info.flowNamePascal}(params: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(create${info.flowNamePascal}Action(params));
        }
    }

    public read${info.flowNamePascal}ById(id: string, config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | null {
        if (config?.selector) {
            const array = config.selector((state: any) => state?.${
              info.apiName
            }?.${info.flowNameCamel});
            if (Array.isArray(array)) {
                return array.find((item: any) => item.${idField} === id) ?? null;
            }
        }
        return null;
    }

    public readAll${info.flowNamePascal}(config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO[] | null {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.${
              info.apiName
            }?.${info.flowNameCamel});
            return data ?? null;
        }
        return null;
    }

    public update${info.flowNamePascal}(id: string, data: Partial<I${
      info.flowNamePascal
    }ReduxDTO>, config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(update${info.flowNamePascal}Action({ id, data }));
        }
    }

    public delete${
      info.flowNamePascal
    }(id: string, config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(delete${info.flowNamePascal}Action(id));
        }
    }

    public clearAll${info.flowNamePascal}(config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(clearAll${info.flowNamePascal}Action());
        }
    }
`;
  } else {
    return `    public save${info.flowNamePascal}(params: I${
      info.flowNamePascal
    }ReduxDTO, config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(save${info.flowNamePascal}Action(params));
        }
    }

    public read${info.flowNamePascal}(config: IConfigDTO): I${
      info.flowNamePascal
    }ReduxDTO | null {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.${
              info.apiName
            }?.${info.flowNameCamel});
            return data ?? null;
        }
        return null;
    }

    public read${info.flowNamePascal}Property<K extends keyof I${
      info.flowNamePascal
    }ReduxDTO>(
        propertyName: K, 
        config: IConfigDTO
    ): I${info.flowNamePascal}ReduxDTO[K] | null {
        if (config?.selector) {
            const value = config.selector((state: any) => state?.${
              info.apiName
            }?.${info.flowNameCamel}?.[propertyName]);
            return value ?? null;
        }
        return null;
    }

    public update${info.flowNamePascal}(data: Partial<I${
      info.flowNamePascal
    }ReduxDTO>, config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(update${info.flowNamePascal}Action(data));
        }
    }

    public clear${info.flowNamePascal}(config: IConfigDTO): void {
        if (config?.dispatch) {
            config.dispatch(clear${info.flowNamePascal}Action());
        }
    }
`;
  }
}

async function generateRepositoryInjection(
  repositoryPath: string,
  repositoryName: string,
  info: ReduxGenerationInfo
): Promise<void> {
  // Actualizar el archivo de inyección global en infrastructure/repositories/redux/injection/
  const basePath = repositoryPath.split(path.sep).slice(0, -3).join(path.sep); // Subir 3 niveles desde custom/flow-name
  const globalInjectionPath = path.join(basePath, "injection");
  const globalInjectionFile = path.join(globalInjectionPath, "injection-repositories-redux.ts");

  // Asegurar que el directorio de inyección existe
  await fs.ensureDir(globalInjectionPath);

  const repositoryClassName = info.flowNamePascal;
  const methodName = `${repositoryClassName}ReduxRepository`;
  
  // Ruta relativa desde el archivo de inyección global al repositorio
  const relativePath = `../${info.apiName}/custom/${info.flowName}/${repositoryName}-redux-repository`;

  // Leer el contenido existente o crear uno nuevo
  let content = "";
  if (await fs.pathExists(globalInjectionFile)) {
    content = await fs.readFile(globalInjectionFile, "utf-8");
    
    // Verificar si el método ya existe
    if (content.includes(`${methodName}()`)) {
      console.log(chalk.gray(`    ℹ️  Método ${methodName}() ya existe en injection`));
      return;
    }

    // Agregar el nuevo import
    const importStatement = `import { ${repositoryClassName}ReduxRepository } from "${relativePath}";`;
    
    // Buscar la última línea de import
    const importRegex = /import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?/g;
    const imports = content.match(importRegex);
    
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, `${lastImport}\n${importStatement}`);
    } else {
      // Si no hay imports, agregar al inicio
      content = `${importStatement}\n\n${content}`;
    }

    // Agregar el nuevo método estático en la clase
    // Buscar el último método estático antes de cerrar la clase
    const classEndRegex = /(\s+public static \w+\(\)[^}]+}\s*)(})\s*$/;
    const match = content.match(classEndRegex);
    
    if (match) {
      const newMethod = `\n    \n    public static ${methodName}() { return ${repositoryClassName}ReduxRepository.getInstance() }`;
      content = content.replace(match[0], `${match[1]}${newMethod}\n${match[2]}`);
    }
  } else {
    // Crear el archivo nuevo
    content = `import { ${repositoryClassName}ReduxRepository } from "${relativePath}";

export class InjectionRepositoriesRedux {
    
    public static ${methodName}() { return ${repositoryClassName}ReduxRepository.getInstance() }
}`;
  }

  await fs.writeFile(globalInjectionFile, content);
}

async function generateReduxMappers(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  // Mappers son opcionales - por ahora solo logeamos
  // Se pueden implementar más adelante si se necesitan
  console.log(chalk.gray("    ⏭️  Mappers (opcional - omitido)"));
}

async function generateReduxInjectionFiles(
  basePath: string,
  info: ReduxGenerationInfo,
  schema: ResponseSchema
): Promise<void> {
  // Los archivos de injection ya fueron generados por sus funciones específicas:
  // - generateUseCaseInjection() - en generateReduxUseCases
  // - generateFacadeInjection() - en generateReduxFacade
  // - generateRepositoryInjection() - en generateReduxRepository
  console.log(
    chalk.gray("    ⏭️  Injection files (ya generados en pasos anteriores)")
  );
}

async function registerInReduxCore(
  basePath: string,
  info: ReduxGenerationInfo
): Promise<void> {
  // Buscar el archivo redux-core.ts en múltiples ubicaciones posibles
  const possiblePaths = [
    path.join(basePath, "core/redux/redux-core.ts"),  // Dentro del API
    path.join(basePath, "../core/redux/redux-core.ts"), // Nivel superior (src/core)
    path.join(basePath, "../../core/redux/redux-core.ts"), // Dos niveles arriba
  ];

  let reduxCorePath = "";
  for (const testPath of possiblePaths) {
    if (await fs.pathExists(testPath)) {
      reduxCorePath = testPath;
      break;
    }
  }

  // Verificar si el archivo existe
  if (!reduxCorePath) {
    console.log(
      chalk.gray("    ℹ️  redux-core.ts no encontrado - omitiendo registro")
    );
    return;
  }

  let content = await fs.readFile(reduxCorePath, "utf-8");

  // Verificar si el slice ya está registrado
  const sliceKey = `key${info.apiNamePascal}`;
  if (content.includes(sliceKey)) {
    console.log(chalk.gray("    ℹ️  Slice ya registrado en redux-core.ts"));
    return;
  }

  // 1. Agregar import del slice
  const sliceImport = `import { ${info.apiNameCamel}Slice, ${sliceKey} } from "@${info.apiName}/infrastructure/repositories/redux/${info.apiName}/${info.apiName}.slice";`;

  // Buscar el último import de slice
  const sliceImportPattern =
    /import.*Slice.*from.*infrastructure\/repositories\/redux.*\.slice['"]/g;
  const sliceImports = content.match(sliceImportPattern);

  if (sliceImports && sliceImports.length > 0) {
    const lastSliceImport = sliceImports[sliceImports.length - 1];
    content = content.replace(
      lastSliceImport,
      `${lastSliceImport}\n${sliceImport}`
    );
  } else {
    // Si no hay imports de slices, buscar cualquier import y agregar después
    const anyImportPattern = /import.*from.*;\n/g;
    const anyImports = content.match(anyImportPattern);
    if (anyImports && anyImports.length > 0) {
      const lastImport = anyImports[anyImports.length - 1];
      content = content.replace(lastImport, `${lastImport}${sliceImport}\n`);
    }
  }

  // 2. Agregar reducer al combineReducers
  const reducerRegistration = `    [${sliceKey}]: ${info.apiNameCamel}Slice.reducer,`;

  // Buscar el combineReducers
  const combineReducersPattern =
    /const rootReducer = combineReducers\(\{[\s\S]*?\}\);/;
  const combineReducersMatch = content.match(combineReducersPattern);

  if (combineReducersMatch) {
    const combineReducersContent = combineReducersMatch[0];
    // Agregar antes del cierre }
    const newCombineReducersContent = combineReducersContent.replace(
      /\}\);/,
      `${reducerRegistration}\n});`
    );
    content = content.replace(
      combineReducersContent,
      newCombineReducersContent
    );
  }

  await fs.writeFile(reduxCorePath, content);
  console.log(chalk.green("    ✓ Slice registrado en redux-core.ts"));
}
