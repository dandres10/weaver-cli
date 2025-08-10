import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { EntitySchema } from '../parsers/swagger-parser';

// Ruta base donde se ejecutará el comando
const DEFAULT_BASE_PATH = process.cwd(); // Directorio actual por defecto
const LOCAL_TEST_PATH = './test-output';

export async function createCorrectEntityFlow(entityName: string, basePath: string = DEFAULT_BASE_PATH, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  console.log(chalk.blue(`📁 Generando flujo completo para ${entityName} en: ${basePath}`));
  
  const entityNameLower = entityName.toLowerCase();
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  
  // Verificar que el directorio base existe
  if (!await fs.pathExists(basePath)) {
    throw new Error(`El directorio base no existe: ${basePath}`);
  }

  // Determinar si estamos en el directorio de la API o necesitamos crear uno
  const currentDirName = path.basename(basePath);
  const shouldCreateApiDir = currentDirName !== apiName;
  
  // Definir las rutas correctas según si necesitamos crear el directorio API o no
  const apiPrefix = shouldCreateApiDir ? `${apiName}/` : '';
  
    const paths = {
    // Domain DTOs
    domainModels: path.join(basePath, `${apiPrefix}domain/models/apis/${apiName}/entities/${entityNameLower}`),
    
    // Domain Repository Interface
    domainRepository: path.join(basePath, `${apiPrefix}domain/services/repositories/apis/${apiName}/entities`),
    
    // Domain Use Cases
    domainUseCases: path.join(basePath, `${apiPrefix}domain/services/use_cases/apis/${apiName}/entities/${entityNameLower}`),
    
    // Infrastructure Entities
    infraEntities: path.join(basePath, `${apiPrefix}infrastructure/entities/apis/${apiName}/entities/${entityNameLower}`),
    
    // Infrastructure Mappers
    infraMappers: path.join(basePath, `${apiPrefix}infrastructure/mappers/apis/${apiName}/entities/${entityNameLower}`),
    
    // Infrastructure Repository
    infraRepository: path.join(basePath, `${apiPrefix}infrastructure/repositories/apis/${apiName}/repositories/entities/${entityNameLower}`),
    
    // Facade
    facade: path.join(basePath, `${apiPrefix}facade/apis/${apiName}/entities`),
    
    // Injection folders
    useCaseInjection: path.join(basePath, `${apiPrefix}domain/services/use_cases/apis/${apiName}/injection/entities`),
    mapperInjection: path.join(basePath, `${apiPrefix}infrastructure/mappers/apis/${apiName}/injection/entities`),
    repositoryInjection: path.join(basePath, `${apiPrefix}infrastructure/repositories/apis/${apiName}/repositories/injection/entities`),
    facadeInjection: path.join(basePath, `${apiPrefix}facade/apis/${apiName}/injection/entities`)
  };

  try {
    // Crear directorios necesarios
    for (const dirPath of Object.values(paths)) {
      await fs.ensureDir(dirPath);
      console.log(chalk.gray(`📂 Directorio creado/verificado: ${dirPath}`));
    }

    // Generar archivos según el patrón correcto
    await generateDomainDTOs(entityName, paths, schema, apiName);
    await generateDomainRepositoryInterface(entityName, paths, schema, apiName);
    await generateDomainUseCases(entityName, paths, schema, apiName);
    await generateInfrastructureEntities(entityName, paths, schema, apiName);
    await generateInfrastructureMappers(entityName, paths, schema, apiName);
    await generateInfrastructureRepository(entityName, paths, schema, apiName);
    await generateFacade(entityName, paths, schema, apiName);
    await generateInjectionFiles(entityName, paths, schema, apiName);
    await generateFacadeInjection(entityName, paths.facadeInjection, apiName);

    console.log(chalk.green(`✨ Flujo ${entityName} generado exitosamente siguiendo el patrón correcto!`));

  } catch (error) {
    console.error(chalk.red('❌ Error generando archivos:'), error);
    throw error;
  }
}

async function generateDomainDTOs(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameLower = entityName.toLowerCase();
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const fields = schema?.fields || getDefaultFields();

  // 1. IEntityDTO - Modelo principal
  const dtoInterface = generateDTOInterface(entityName, fields, 'main');
  await fs.writeFile(
    path.join(paths.domainModels, `i-${entityNameKebab}-dto.ts`),
    dtoInterface
  );
  console.log(chalk.green(`✅ DTO principal: i-${entityNameKebab}-dto.ts`));

  // 2. IEntitySaveDTO
  const saveDtoInterface = generateDTOInterface(entityName, fields, 'save');
  await fs.writeFile(
    path.join(paths.domainModels, `i-${entityNameKebab}-save-dto.ts`),
    saveDtoInterface
  );
  console.log(chalk.green(`✅ Save DTO: i-${entityNameKebab}-save-dto.ts`));

  // 3. IEntityReadDTO
  const readDtoInterface = generateDTOInterface(entityName, fields, 'read');
  await fs.writeFile(
    path.join(paths.domainModels, `i-${entityNameKebab}-read-dto.ts`),
    readDtoInterface
  );
  console.log(chalk.green(`✅ Read DTO: i-${entityNameKebab}-read-dto.ts`));

  // 4. IEntityUpdateDTO
  const updateDtoInterface = generateDTOInterface(entityName, fields, 'update');
  await fs.writeFile(
    path.join(paths.domainModels, `i-${entityNameKebab}-update-dto.ts`),
    updateDtoInterface
  );
  console.log(chalk.green(`✅ Update DTO: i-${entityNameKebab}-update-dto.ts`));

  // 5. IEntityDeleteDTO
  const deleteDtoInterface = generateDTOInterface(entityName, fields, 'delete');
  await fs.writeFile(
    path.join(paths.domainModels, `i-${entityNameKebab}-delete-dto.ts`),
    deleteDtoInterface
  );
  console.log(chalk.green(`✅ Delete DTO: i-${entityNameKebab}-delete-dto.ts`));

  // 6. Index file para exportar todos los DTOs
  const indexContent = `export { I${entityName}DTO } from './i-${entityNameKebab}-dto';
export { I${entityName}SaveDTO } from './i-${entityNameKebab}-save-dto';
export { I${entityName}ReadDTO } from './i-${entityNameKebab}-read-dto';
export { I${entityName}UpdateDTO } from './i-${entityNameKebab}-update-dto';
export { I${entityName}DeleteDTO } from './i-${entityNameKebab}-delete-dto';`;

  await fs.writeFile(
    path.join(paths.domainModels, 'index.ts'),
    indexContent
  );
  console.log(chalk.green(`✅ Index DTO: index.ts`));
}

async function generateDomainRepositoryInterface(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

  const repositoryInterface = `import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { I${entityName}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityName.toLowerCase()}";
import {
  I${entityName}DeleteEntity,
  I${entityName}ReadEntity,
  I${entityName}SaveEntity,
  I${entityName}UpdateEntity,
} from "@${apiName}/infrastructure/entities/apis/${apiName}/entities/${entityName.toLowerCase()}";

export abstract class I${entityName}Repository {
  abstract read(params: I${entityName}ReadEntity, config: IConfigDTO): Promise<I${entityName}DTO | null>;
  abstract save(params: I${entityName}SaveEntity, config: IConfigDTO): Promise<I${entityName}DTO | null>;
  abstract update(params: I${entityName}UpdateEntity, config: IConfigDTO): Promise<I${entityName}DTO | null>;
  abstract delete(params: I${entityName}DeleteEntity, config: IConfigDTO): Promise<I${entityName}DTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<I${entityName}DTO[] | null>;
}`;

  await fs.writeFile(
    path.join(paths.domainRepository, `i-${entityNameKebab}-repository.ts`),
    repositoryInterface
  );
  console.log(chalk.green(`✅ Repository interface: i-${entityNameKebab}-repository.ts`));
}

async function generateDomainUseCases(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameLower = entityName.toLowerCase();
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

  // 1. Save Use Case
  const saveUseCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { I${entityName}DTO, I${entityName}SaveDTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntities${entityName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-mapper";
import { InjectionPlatformEntitiesRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/entities/injection-${apiName}-entities-repository";

export class ${entityName}SaveUseCase implements UseCase<I${entityName}SaveDTO, I${entityName}DTO | null> {
  private static instance: ${entityName}SaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.${entityName}Repository();
  private mapper = InjectionPlatformEntities${entityName}Mapper.${entityName}SaveMapper();

  public static getInstance(): ${entityName}SaveUseCase {
    if (!${entityName}SaveUseCase.instance)
      ${entityName}SaveUseCase.instance = new ${entityName}SaveUseCase();
    return ${entityName}SaveUseCase.instance;
  }

  public async execute(params: I${entityName}SaveDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}`;

  await fs.writeFile(
    path.join(paths.domainUseCases, `${entityNameKebab}-save-use-case.ts`),
    saveUseCase
  );
  console.log(chalk.green(`✅ Save Use Case: ${entityNameKebab}-save-use-case.ts`));

  // 2. Read Use Case
  const readUseCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { I${entityName}DTO, I${entityName}ReadDTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntities${entityName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-mapper";
import { InjectionPlatformEntitiesRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/entities/injection-${apiName}-entities-repository";

export class ${entityName}ReadUseCase implements UseCase<I${entityName}ReadDTO, I${entityName}DTO | null> {
  private static instance: ${entityName}ReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.${entityName}Repository();
  private mapper = InjectionPlatformEntities${entityName}Mapper.${entityName}ReadMapper();

  public static getInstance(): ${entityName}ReadUseCase {
    if (!${entityName}ReadUseCase.instance)
      ${entityName}ReadUseCase.instance = new ${entityName}ReadUseCase();
    return ${entityName}ReadUseCase.instance;
  }

  public async execute(params: I${entityName}ReadDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}`;

  await fs.writeFile(
    path.join(paths.domainUseCases, `${entityNameKebab}-read-use-case.ts`),
    readUseCase
  );
  console.log(chalk.green(`✅ Read Use Case: ${entityNameKebab}-read-use-case.ts`));

  // 3. Update Use Case
  const updateUseCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { I${entityName}DTO, I${entityName}UpdateDTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntities${entityName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-mapper";
import { InjectionPlatformEntitiesRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/entities/injection-${apiName}-entities-repository";

export class ${entityName}UpdateUseCase implements UseCase<I${entityName}UpdateDTO, I${entityName}DTO | null> {
  private static instance: ${entityName}UpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.${entityName}Repository();
  private mapper = InjectionPlatformEntities${entityName}Mapper.${entityName}UpdateMapper();

  public static getInstance(): ${entityName}UpdateUseCase {
    if (!${entityName}UpdateUseCase.instance)
      ${entityName}UpdateUseCase.instance = new ${entityName}UpdateUseCase();
    return ${entityName}UpdateUseCase.instance;
  }

  public async execute(params: I${entityName}UpdateDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}`;

  await fs.writeFile(
    path.join(paths.domainUseCases, `${entityNameKebab}-update-use-case.ts`),
    updateUseCase
  );
  console.log(chalk.green(`✅ Update Use Case: ${entityNameKebab}-update-use-case.ts`));

  // 4. Delete Use Case
  const deleteUseCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { I${entityName}DTO, I${entityName}DeleteDTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntities${entityName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-mapper";
import { InjectionPlatformEntitiesRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/entities/injection-${apiName}-entities-repository";

export class ${entityName}DeleteUseCase implements UseCase<I${entityName}DeleteDTO, I${entityName}DTO | null> {
  private static instance: ${entityName}DeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.${entityName}Repository();
  private mapper = InjectionPlatformEntities${entityName}Mapper.${entityName}DeleteMapper();

  public static getInstance(): ${entityName}DeleteUseCase {
    if (!${entityName}DeleteUseCase.instance)
      ${entityName}DeleteUseCase.instance = new ${entityName}DeleteUseCase();
    return ${entityName}DeleteUseCase.instance;
  }

  public async execute(params: I${entityName}DeleteDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}`;

  await fs.writeFile(
    path.join(paths.domainUseCases, `${entityNameKebab}-delete-use-case.ts`),
    deleteUseCase
  );
  console.log(chalk.green(`✅ Delete Use Case: ${entityNameKebab}-delete-use-case.ts`));

  // 5. List Use Case
  const listUseCase = `import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { I${entityName}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntitiesRepository } from "@${apiName}/infrastructure/repositories/apis/${apiName}/repositories/injection/entities/injection-${apiName}-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class ${entityName}ListUseCase implements UseCase<IPaginationBackendDTO, I${entityName}DTO[] | null> {
  private static instance: ${entityName}ListUseCase;
  private repository = InjectionPlatformEntitiesRepository.${entityName}Repository();

  public static getInstance(): ${entityName}ListUseCase {
    if (!${entityName}ListUseCase.instance)
      ${entityName}ListUseCase.instance = new ${entityName}ListUseCase();
    return ${entityName}ListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<I${entityName}DTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}`;

  await fs.writeFile(
    path.join(paths.domainUseCases, `${entityNameKebab}-list-use-case.ts`),
    listUseCase
  );
  console.log(chalk.green(`✅ List Use Case: ${entityNameKebab}-list-use-case.ts`));
}

async function generateInfrastructureEntities(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const fields = schema?.fields || getDefaultFields();

  // 1. IEntityEntity - Entidad principal
  const entityInterface = generateEntityInterface(entityName, fields, 'main');
  await fs.writeFile(
    path.join(paths.infraEntities, `i-${entityNameKebab}-entity.ts`),
    entityInterface
  );
  console.log(chalk.green(`✅ Entity principal: i-${entityNameKebab}-entity.ts`));

  // 2. IEntitySaveEntity
  const saveEntityInterface = generateEntityInterface(entityName, fields, 'save');
  await fs.writeFile(
    path.join(paths.infraEntities, `i-${entityNameKebab}-save-entity.ts`),
    saveEntityInterface
  );
  console.log(chalk.green(`✅ Save Entity: i-${entityNameKebab}-save-entity.ts`));

  // 3. IEntityReadEntity
  const readEntityInterface = generateEntityInterface(entityName, fields, 'read');
  await fs.writeFile(
    path.join(paths.infraEntities, `i-${entityNameKebab}-read-entity.ts`),
    readEntityInterface
  );
  console.log(chalk.green(`✅ Read Entity: i-${entityNameKebab}-read-entity.ts`));

  // 4. IEntityUpdateEntity
  const updateEntityInterface = generateEntityInterface(entityName, fields, 'update');
  await fs.writeFile(
    path.join(paths.infraEntities, `i-${entityNameKebab}-update-entity.ts`),
    updateEntityInterface
  );
  console.log(chalk.green(`✅ Update Entity: i-${entityNameKebab}-update-entity.ts`));

  // 5. IEntityDeleteEntity
  const deleteEntityInterface = generateEntityInterface(entityName, fields, 'delete');
  await fs.writeFile(
    path.join(paths.infraEntities, `i-${entityNameKebab}-delete-entity.ts`),
    deleteEntityInterface
  );
  console.log(chalk.green(`✅ Delete Entity: i-${entityNameKebab}-delete-entity.ts`));

  // 6. Index file para exportar todas las entidades
  const indexContent = `export { I${entityName}Entity } from './i-${entityNameKebab}-entity';
export { I${entityName}SaveEntity } from './i-${entityNameKebab}-save-entity';
export { I${entityName}ReadEntity } from './i-${entityNameKebab}-read-entity';
export { I${entityName}UpdateEntity } from './i-${entityNameKebab}-update-entity';
export { I${entityName}DeleteEntity } from './i-${entityNameKebab}-delete-entity';`;

  await fs.writeFile(
    path.join(paths.infraEntities, 'index.ts'),
    indexContent
  );
  console.log(chalk.green(`✅ Index Entity: index.ts`));
}

// Continúo en la siguiente función...
async function generateInfrastructureMappers(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const entityNameLower = entityName.toLowerCase();
  const fields = schema?.fields || getDefaultFields();

  // 1. Entity Mapper (principal)
  const entityMapper = generateEntityMapper(entityName, fields, apiName);
  await fs.writeFile(
    path.join(paths.infraMappers, `${entityNameKebab}-entity-mapper.ts`),
    entityMapper
  );
  console.log(chalk.green(`✅ Entity Mapper: ${entityNameKebab}-entity-mapper.ts`));

  // 2. Save Mapper
  const saveMapper = generateSpecificMapper(entityName, fields, 'save', apiName);
  await fs.writeFile(
    path.join(paths.infraMappers, `${entityNameKebab}-save-mapper.ts`),
    saveMapper
  );
  console.log(chalk.green(`✅ Save Mapper: ${entityNameKebab}-save-mapper.ts`));

  // 3. Read Mapper
  const readMapper = generateSpecificMapper(entityName, fields, 'read', apiName);
  await fs.writeFile(
    path.join(paths.infraMappers, `${entityNameKebab}-read-mapper.ts`),
    readMapper
  );
  console.log(chalk.green(`✅ Read Mapper: ${entityNameKebab}-read-mapper.ts`));

  // 4. Update Mapper
  const updateMapper = generateSpecificMapper(entityName, fields, 'update', apiName);
  await fs.writeFile(
    path.join(paths.infraMappers, `${entityNameKebab}-update-mapper.ts`),
    updateMapper
  );
  console.log(chalk.green(`✅ Update Mapper: ${entityNameKebab}-update-mapper.ts`));

  // 5. Delete Mapper
  const deleteMapper = generateSpecificMapper(entityName, fields, 'delete', apiName);
  await fs.writeFile(
    path.join(paths.infraMappers, `${entityNameKebab}-delete-mapper.ts`),
    deleteMapper
  );
  console.log(chalk.green(`✅ Delete Mapper: ${entityNameKebab}-delete-mapper.ts`));
}

async function generateInfrastructureRepository(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const entityNameLower = entityName.toLowerCase();
  const entityNameUpper = entityName.toUpperCase();

  const repositoryContent = `import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { I${entityName}Repository } from "@${apiName}/domain/services/repositories/apis/${apiName}/entities/i-${entityNameKebab}-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { I${entityName}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { I${entityName}DeleteEntity, I${entityName}Entity, I${entityName}ReadEntity, I${entityName}SaveEntity, I${entityName}UpdateEntity } from "@${apiName}/infrastructure/entities/apis/${apiName}/entities/${entityNameLower}";
import { InjectionPlatformEntities${entityName}Mapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-mapper";

export class ${entityName}Repository extends I${entityName}Repository {

    private static instance: ${entityName}Repository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly ${entityNameLower}EntityMapper = InjectionPlatformEntities${entityName}Mapper.${entityName}EntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): ${entityName}Repository {
        if (!${entityName}Repository.instance)
            ${entityName}Repository.instance = new ${entityName}Repository();
        return ${entityName}Repository.instance;
    }

    public async read(
        params: I${entityName}ReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<I${entityName}DTO | null> {
        if (config.loadService)
            return platformAxios
                .get(\`\${CONST_PLATFORM_API_ROUTES.${entityNameUpper}}/\${params.id}\`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<I${entityName}Entity>(data);
                    if (entity)
                        return this.${entityNameLower}EntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: I${entityName}SaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<I${entityName}DTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.${entityNameUpper}, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<I${entityName}Entity>(data);
                    if (entity)
                        return this.${entityNameLower}EntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: I${entityName}UpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<I${entityName}DTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.${entityNameUpper}, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<I${entityName}Entity>(data);
                    if (entity)
                        return this.${entityNameLower}EntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: I${entityName}DeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<I${entityName}DTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(\`\${CONST_PLATFORM_API_ROUTES.${entityNameUpper}}/\${params.id}\`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<I${entityName}Entity>(data);
                    if (entity)
                        return this.${entityNameLower}EntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<I${entityName}DTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.${entityNameUpper}_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<I${entityName}Entity[]>(data);
                    if (entities)
                        return this.${entityNameLower}EntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}`;

  await fs.writeFile(
    path.join(paths.infraRepository, `${entityNameKebab}-repository.ts`),
    repositoryContent
  );
  console.log(chalk.green(`✅ Repository: ${entityNameKebab}-repository.ts`));
}

async function generateFacade(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
  const entityNameLower = entityName.toLowerCase();

  const facadeContent = `import { IConfigDTO } from "@bus/core/interfaces";
import {
  I${entityName}DTO,
  I${entityName}DeleteDTO,
  I${entityName}ReadDTO,
  I${entityName}SaveDTO,
  I${entityName}UpdateDTO,
} from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntities${entityName}UseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/injection/entities/injection-${apiName}-entities-${entityNameKebab}-use-case";

export class ${entityName}Facade {
  private static instance: ${entityName}Facade;

  private readonly readUseCase = InjectionPlatformEntities${entityName}UseCase.${entityName}ReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntities${entityName}UseCase.${entityName}SaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntities${entityName}UseCase.${entityName}UpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntities${entityName}UseCase.${entityName}DeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntities${entityName}UseCase.${entityName}ListUseCase();

  public static getInstance(): ${entityName}Facade {
    if (!${entityName}Facade.instance)
      ${entityName}Facade.instance = new ${entityName}Facade();
    return ${entityName}Facade.instance;
  }

  public async read(params: I${entityName}ReadDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: I${entityName}SaveDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: I${entityName}UpdateDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: I${entityName}DeleteDTO, config?: IConfigDTO): Promise<I${entityName}DTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<I${entityName}DTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}`;

  await fs.writeFile(
    path.join(paths.facade, `${entityNameKebab}-facade.ts`),
    facadeContent
  );
  console.log(chalk.green(`✅ Facade: ${entityNameKebab}-facade.ts`));
}

async function generateInjectionFiles(entityName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

  // 1. Use Case Injection
  const useCaseInjection = `import { ${entityName}DeleteUseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-delete-use-case";
import { ${entityName}ListUseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-list-use-case";
import { ${entityName}ReadUseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-read-use-case";
import { ${entityName}SaveUseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-save-use-case";
import { ${entityName}UpdateUseCase } from "@${apiName}/domain/services/use_cases/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-update-use-case";

export class InjectionPlatformEntities${entityName}UseCase {
  public static ${entityName}ReadUseCase(): ${entityName}ReadUseCase {
    return ${entityName}ReadUseCase.getInstance();
  }

  public static ${entityName}SaveUseCase(): ${entityName}SaveUseCase {
    return ${entityName}SaveUseCase.getInstance();
  }

  public static ${entityName}UpdateUseCase(): ${entityName}UpdateUseCase {
    return ${entityName}UpdateUseCase.getInstance();
  }

  public static ${entityName}DeleteUseCase(): ${entityName}DeleteUseCase {
    return ${entityName}DeleteUseCase.getInstance();
  }

  public static ${entityName}ListUseCase(): ${entityName}ListUseCase {
    return ${entityName}ListUseCase.getInstance();
  }
}`;

  await fs.writeFile(
    path.join(paths.useCaseInjection, `injection-platform-entities-${entityNameKebab}-use-case.ts`),
    useCaseInjection
  );
  console.log(chalk.green(`✅ Use Case Injection: injection-platform-entities-${entityNameKebab}-use-case.ts`));

  // 2. Mapper Injection
  const mapperInjection = `import { ${entityName}DeleteMapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-delete-mapper";
import { ${entityName}EntityMapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-entity-mapper";
import { ${entityName}ReadMapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-read-mapper";
import { ${entityName}SaveMapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-save-mapper";
import { ${entityName}UpdateMapper } from "@${apiName}/infrastructure/mappers/apis/${apiName}/entities/${entityName.toLowerCase()}/${entityNameKebab}-update-mapper";

export class InjectionPlatformEntities${entityName}Mapper {
  public static ${entityName}EntityMapper(): ${entityName}EntityMapper {
    return ${entityName}EntityMapper.getInstance();
  }

  public static ${entityName}SaveMapper(): ${entityName}SaveMapper {
    return ${entityName}SaveMapper.getInstance();
  }

  public static ${entityName}ReadMapper(): ${entityName}ReadMapper {
    return ${entityName}ReadMapper.getInstance();
  }

  public static ${entityName}UpdateMapper(): ${entityName}UpdateMapper {
    return ${entityName}UpdateMapper.getInstance();
  }

  public static ${entityName}DeleteMapper(): ${entityName}DeleteMapper {
    return ${entityName}DeleteMapper.getInstance();
  }
}`;

  await fs.writeFile(
    path.join(paths.mapperInjection, `injection-platform-entities-${entityNameKebab}-mapper.ts`),
    mapperInjection
  );
  console.log(chalk.green(`✅ Mapper Injection: injection-platform-entities-${entityNameKebab}-mapper.ts`));

  // 3. Repository Injection
  await generateRepositoryInjection(entityName, paths.repositoryInjection, apiName);
  console.log(chalk.green(`✅ Repository Injection: injection-platform-entities-repository.ts`));
}

// Helper functions
function getDefaultFields(): any[] {
  return [
    { name: 'id', type: 'string', required: false, format: 'uuid4' },
    { name: 'name', type: 'string', required: true },
    { name: 'state', type: 'boolean', required: false }
  ];
}

function generateDTOInterface(entityName: string, fields: any[], type: 'main' | 'save' | 'read' | 'update' | 'delete'): string {
  const interfaceName = type === 'main' ? `I${entityName}DTO` :
    type === 'save' ? `I${entityName}SaveDTO` :
      type === 'read' ? `I${entityName}ReadDTO` :
        type === 'update' ? `I${entityName}UpdateDTO` :
          `I${entityName}DeleteDTO`;

  let content = `export interface ${interfaceName} {\n`;

  if (type === 'delete' || type === 'read') {
    // Para delete y read, solo necesitamos el ID
    content += `  id: string;\n`;
  } else {
    // Agregar siempre el campo id para DTOs principales (main, save, update)
    if (type === 'main') {
      content += `  id?: string;\n`;
    }
    
    fields.forEach(field => {
      const fieldName = convertToCamelCase(field.name);
      const isOptional = getFieldOptionalStatus(field, type);
      const tsType = getTypeScriptType(field);

      content += `  ${fieldName}${isOptional ? '?' : ''}: ${tsType};\n`;
    });
  }

  content += '}';
  return content;
}

function generateEntityInterface(entityName: string, fields: any[], type: 'main' | 'save' | 'read' | 'update' | 'delete'): string {
  const interfaceName = type === 'main' ? `I${entityName}Entity` :
    type === 'save' ? `I${entityName}SaveEntity` :
      type === 'read' ? `I${entityName}ReadEntity` :
        type === 'update' ? `I${entityName}UpdateEntity` :
          `I${entityName}DeleteEntity`;

  let content = `export interface ${interfaceName} {\n`;

  if (type === 'delete' || type === 'read') {
    content += `  id: string;\n`;
  } else {
    // Agregar siempre el campo id para Entities principales (main, save, update)
    if (type === 'main') {
      content += `  id?: string;\n`;
    }
    
    fields.forEach(field => {
      const fieldName = field.name; // Mantener snake_case para entities
      const isOptional = getFieldOptionalStatus(field, type);
      const tsType = getTypeScriptType(field);

      content += `  ${fieldName}${isOptional ? '?' : ''}: ${tsType};\n`;
    });
  }

  content += '}';
  return content;
}

function generateEntityMapper(entityName: string, fields: any[], apiName: string = 'platform'): string {
  const entityNameLower = entityName.toLowerCase();
  
  // Agregar siempre el campo id al principio
  const mapFromFields = [
    '      id: param.id',
    ...fields.map(field => {
      const dtoField = convertToCamelCase(field.name);
      const entityField = field.name;
      return `      ${dtoField}: param.${entityField}`;
    })
  ].join(',\n');

  const mapToFields = [
    '      id: param.id',
    ...fields.map(field => {
      const dtoField = convertToCamelCase(field.name);
      const entityField = field.name;
      return `      ${entityField}: param.${dtoField}`;
    })
  ].join(',\n');

  return `import { Mapper } from "@bus/core/classes";
import { I${entityName}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { I${entityName}Entity } from "@${apiName}/infrastructure/entities/apis/${apiName}/entities/${entityNameLower}";

export class ${entityName}EntityMapper extends Mapper<I${entityName}Entity, I${entityName}DTO> {
  private static instance: ${entityName}EntityMapper;
  public constructor() { super(); }

  public static getInstance(): ${entityName}EntityMapper {
    if (!${entityName}EntityMapper.instance)
      ${entityName}EntityMapper.instance = new ${entityName}EntityMapper();
    return ${entityName}EntityMapper.instance;
  }

  public mapFrom(param: I${entityName}Entity): I${entityName}DTO {
    return {
${mapFromFields}
    };
  }

  public mapFromList(params: I${entityName}Entity[]): I${entityName}DTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: I${entityName}DTO): I${entityName}Entity {
    return {
${mapToFields}
    };
  }

  public mapToList(params: I${entityName}DTO[]): I${entityName}Entity[] {
    return params.map((param) => this.mapTo(param));
  }
}`;
}

function generateSpecificMapper(entityName: string, fields: any[], operation: 'save' | 'read' | 'update' | 'delete', apiName: string = 'platform'): string {
  const entityNameLower = entityName.toLowerCase();
  const operationCap = operation.charAt(0).toUpperCase() + operation.slice(1);

  if (operation === 'delete' || operation === 'read') {
    return `import { Mapper } from "@bus/core/classes";
import { I${entityName}${operationCap}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { I${entityName}${operationCap}Entity } from "@${apiName}/infrastructure/entities/apis/${apiName}/entities/${entityNameLower}";

export class ${entityName}${operationCap}Mapper extends Mapper<I${entityName}${operationCap}Entity, I${entityName}${operationCap}DTO> {

  private static instance: ${entityName}${operationCap}Mapper;
  public constructor() { super(); }

  public static getInstance(): ${entityName}${operationCap}Mapper {
    if (!${entityName}${operationCap}Mapper.instance)
      ${entityName}${operationCap}Mapper.instance = new ${entityName}${operationCap}Mapper();
    return ${entityName}${operationCap}Mapper.instance;
  }

  public mapFrom(param: I${entityName}${operationCap}Entity): I${entityName}${operationCap}DTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: I${entityName}${operationCap}Entity[]): I${entityName}${operationCap}DTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: I${entityName}${operationCap}DTO): I${entityName}${operationCap}Entity {
    return {
      id: param.id
    };
  }

  public mapToList(params: I${entityName}${operationCap}DTO[]): I${entityName}${operationCap}Entity[] {
    return params.map((param) => this.mapTo(param));
  }
}`;
  }

  // Para save y update, generar mappers más complejos
  const relevantFields = fields.filter(field =>
    operation === 'save' ? !['id', 'created_date', 'updated_date'].includes(field.name) :
      operation === 'update' ? true : true
  );

  const mapFromFields = relevantFields.map(field => {
    const dtoField = convertToCamelCase(field.name);
    const entityField = field.name;

    if (field.name === 'id' && operation === 'update') {
      return `      ${dtoField}: param.${entityField}`;
    } else if (['created_date', 'updated_date', 'id'].includes(field.name) && operation === 'save') {
      return null; // No incluir estos campos en save
    }

    return `      ${dtoField}: param.${entityField}`;
  }).filter(Boolean).join(',\n');

  const mapToFields = relevantFields.map(field => {
    const dtoField = convertToCamelCase(field.name);
    const entityField = field.name;

    if (field.name === 'id' && operation === 'update') {
      return `      ${entityField}: param.${dtoField}`;
    } else if (['created_date', 'updated_date', 'id'].includes(field.name) && operation === 'save') {
      return null;
    }

    // Agregar valores por defecto para campos opcionales
    if (!field.required && operation === 'save') {
      if (field.type === 'boolean') {
        return `      ${entityField}: param.${dtoField} ?? ${field.name === 'state' ? 'true' : 'false'}`;
      }
    }

    return `      ${entityField}: param.${dtoField}`;
  }).filter(Boolean).join(',\n');

  return `import { Mapper } from "@bus/core/classes";
import { I${entityName}${operationCap}DTO } from "@${apiName}/domain/models/apis/${apiName}/entities/${entityNameLower}";
import { I${entityName}${operationCap}Entity } from "@${apiName}/infrastructure/entities/apis/${apiName}/entities/${entityNameLower}";

export class ${entityName}${operationCap}Mapper extends Mapper<I${entityName}${operationCap}Entity, I${entityName}${operationCap}DTO> {

  private static instance: ${entityName}${operationCap}Mapper;
  public constructor() { super(); }

  public static getInstance(): ${entityName}${operationCap}Mapper {
    if (!${entityName}${operationCap}Mapper.instance)
      ${entityName}${operationCap}Mapper.instance = new ${entityName}${operationCap}Mapper();
    return ${entityName}${operationCap}Mapper.instance;
  }

  public mapFrom(param: I${entityName}${operationCap}Entity): I${entityName}${operationCap}DTO {
    return {
${mapFromFields}
    };
  }

  public mapFromList(params: I${entityName}${operationCap}Entity[]): I${entityName}${operationCap}DTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: I${entityName}${operationCap}DTO): I${entityName}${operationCap}Entity {
    return {
${mapToFields}
    };
  }

  public mapToList(params: I${entityName}${operationCap}DTO[]): I${entityName}${operationCap}Entity[] {
    return params.map((param) => this.mapTo(param));
  }
}`;
}

function convertToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function getFieldOptionalStatus(field: any, type: string): boolean {
  if (type === 'save') {
    return !field.required || ['id', 'created_date', 'updated_date'].includes(field.name);
  }
  if (type === 'update') {
    return field.name !== 'id';
  }
  return !field.required;
}

function getTypeScriptType(field: any): string {
  if (field.format === 'date-time' || field.format === 'date') return 'string';
  if (field.format === 'uuid4') return 'string';

  switch (field.type) {
    case 'integer': return 'number';
    case 'number': return 'number';
    case 'boolean': return 'boolean';
    case 'array': return 'any[]';
    default: return 'string';
  }
}

/**
 * Genera o actualiza el archivo de injection para facades
 */
async function generateFacadeInjection(entityName: string, facadeInjectionPath: string, apiName: string = 'platform'): Promise<void> {
  const injectionFileName = `injection-${apiName}-entities-facade.ts`;
  const injectionFilePath = path.join(facadeInjectionPath, injectionFileName);
  
  const entityNameCapitalized = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

  // Verificar si el archivo ya existe
  const fileExists = await fs.pathExists(injectionFilePath);
  
  if (fileExists) {
    // Leer archivo existente
    const existingContent = await fs.readFile(injectionFilePath, 'utf8');
    
    // Verificar si la entidad ya está incluida
    const facadeMethodPattern = new RegExp(`\\s+public\\s+static\\s+${entityNameCapitalized}Facade\\(\\)`, 'g');
    const importPattern = new RegExp(`import.*${entityNameCapitalized}Facade.*from.*${entityNameKebab}-facade`, 'g');
    
    if (!facadeMethodPattern.test(existingContent) || !importPattern.test(existingContent)) {
      // Agregar import si no existe
      let updatedContent = existingContent;
      
      if (!importPattern.test(existingContent)) {
        const importLine = `import { ${entityNameCapitalized}Facade } from "@${apiName}/facade/apis/${apiName}/entities/${entityNameKebab}-facade";`;
        
        // Buscar la última línea de import
        const importLines = existingContent.split('\n').filter(line => line.trim().startsWith('import'));
        const lastImportIndex = existingContent.lastIndexOf(importLines[importLines.length - 1]) + importLines[importLines.length - 1].length;
        
        updatedContent = existingContent.slice(0, lastImportIndex) + '\n' + importLine + existingContent.slice(lastImportIndex);
      }
      
      // Agregar método si no existe
      if (!facadeMethodPattern.test(updatedContent)) {
        const methodLine = `    public static ${entityNameCapitalized}Facade() { return ${entityNameCapitalized}Facade.getInstance(); }`;
        
        // Buscar el final de la clase (antes del último })
        const classEndIndex = updatedContent.lastIndexOf('}');
        const beforeClassEnd = updatedContent.slice(0, classEndIndex);
        const afterClassEnd = updatedContent.slice(classEndIndex);
        
        updatedContent = beforeClassEnd + methodLine + '\n' + afterClassEnd;
      }
      
      await fs.writeFile(injectionFilePath, updatedContent);
      console.log(chalk.green(`✅ Facade Injection actualizado: ${injectionFileName} (agregado ${entityNameCapitalized}Facade)`));
    } else {
      console.log(chalk.yellow(`⚠️  Facade Injection: ${entityNameCapitalized}Facade ya existe en ${injectionFileName}`));
    }
  } else {
    // Crear archivo nuevo
    const apiNameCapitalized = apiName.charAt(0).toUpperCase() + apiName.slice(1);
    const facadeInjectionContent = `import { ${entityNameCapitalized}Facade } from "@${apiName}/facade/apis/${apiName}/entities/${entityNameKebab}-facade";

export class Injection${apiNameCapitalized}EntitiesFacade {
    public static ${entityNameCapitalized}Facade() { return ${entityNameCapitalized}Facade.getInstance(); }
}


`;

    await fs.writeFile(injectionFilePath, facadeInjectionContent);
    console.log(chalk.green(`✅ Facade Injection creado: ${injectionFileName}`));
  }
}

/**
 * Genera o actualiza el archivo de injection para repositories
 */
async function generateRepositoryInjection(entityName: string, repositoryInjectionPath: string, apiName: string = 'platform'): Promise<void> {
  const injectionFileName = `injection-${apiName}-entities-repository.ts`;
  const injectionFilePath = path.join(repositoryInjectionPath, injectionFileName);
  
  const entityNameCapitalized = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const entityNameKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

  // Verificar si el archivo ya existe
  const fileExists = await fs.pathExists(injectionFilePath);
  
  if (fileExists) {
    // Leer archivo existente
    const existingContent = await fs.readFile(injectionFilePath, 'utf8');
    
    // Verificar si la entidad ya está incluida
    const repositoryMethodPattern = new RegExp(`\\s+public\\s+static\\s+${entityNameCapitalized}Repository\\(\\)`, 'g');
    const importPattern = new RegExp(`import.*${entityNameCapitalized}Repository.*from.*entities/${entityName.toLowerCase()}`, 'g');
    
    if (!repositoryMethodPattern.test(existingContent) || !importPattern.test(existingContent)) {
      // Agregar import si no existe
      let updatedContent = existingContent;
      
      if (!importPattern.test(existingContent)) {
        const importLine = `import { ${entityNameCapitalized}Repository } from "../../entities/${entityName.toLowerCase()}/${entityNameKebab}-repository";`;
        
        // Buscar la última línea de import
        const importLines = existingContent.split('\n').filter(line => line.trim().startsWith('import'));
        const lastImportIndex = existingContent.lastIndexOf(importLines[importLines.length - 1]) + importLines[importLines.length - 1].length;
        
        updatedContent = existingContent.slice(0, lastImportIndex) + '\n' + importLine + existingContent.slice(lastImportIndex);
      }
      
      // Agregar método si no existe
      if (!repositoryMethodPattern.test(updatedContent)) {
        const methodLine = `  public static ${entityNameCapitalized}Repository() { return ${entityNameCapitalized}Repository.getInstance(); }`;
        
        // Buscar el final de la clase (antes del último })
        const classEndIndex = updatedContent.lastIndexOf('}');
        const beforeClassEnd = updatedContent.slice(0, classEndIndex);
        const afterClassEnd = updatedContent.slice(classEndIndex);
        
        updatedContent = beforeClassEnd + methodLine + '\n' + afterClassEnd;
      }
      
      await fs.writeFile(injectionFilePath, updatedContent);
      console.log(chalk.green(`✅ Repository Injection actualizado: ${injectionFileName} (agregado ${entityNameCapitalized}Repository)`));
    } else {
      console.log(chalk.yellow(`⚠️  Repository Injection: ${entityNameCapitalized}Repository ya existe en ${injectionFileName}`));
    }
  } else {
    // Crear archivo nuevo
    const apiNameCapitalized = apiName.charAt(0).toUpperCase() + apiName.slice(1);
    const repositoryInjectionContent = `import { ${entityNameCapitalized}Repository } from "../../entities/${entityName.toLowerCase()}/${entityNameKebab}-repository";

export class Injection${apiNameCapitalized}EntitiesRepository {
  public static ${entityNameCapitalized}Repository() { return ${entityNameCapitalized}Repository.getInstance(); }
}


`;

    await fs.writeFile(injectionFilePath, repositoryInjectionContent);
    console.log(chalk.green(`✅ Repository Injection creado: ${injectionFileName}`));
  }
}
