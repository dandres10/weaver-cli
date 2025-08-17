import { IConfigDTO } from "@bus/core/interfaces";
import {
  IPlatformDTO,
  IPlatformDeleteDTO,
  IPlatformReadDTO,
  IPlatformSaveDTO,
  IPlatformUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/platform";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesPlatformUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-platform-use-case";

export class PlatformFacade {
  private static instance: PlatformFacade;

  private readonly readUseCase = InjectionPlatformEntitiesPlatformUseCase.PlatformReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesPlatformUseCase.PlatformSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesPlatformUseCase.PlatformUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesPlatformUseCase.PlatformDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesPlatformUseCase.PlatformListUseCase();

  public static getInstance(): PlatformFacade {
    if (!PlatformFacade.instance)
      PlatformFacade.instance = new PlatformFacade();
    return PlatformFacade.instance;
  }

  public async read(params: IPlatformReadDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IPlatformSaveDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IPlatformUpdateDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IPlatformDeleteDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IPlatformDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}