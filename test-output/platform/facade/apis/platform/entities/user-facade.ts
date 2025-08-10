import { IConfigDTO } from "@bus/core/interfaces";
import {
  IUserDTO,
  IUserDeleteDTO,
  IUserReadDTO,
  IUserSaveDTO,
  IUserUpdateDTO,
} from "@bus/domain/models/apis/platform/entities/user";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesUserUseCase } from "@bus/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-user-use-case";

export class UserFacade {
  private static instance: UserFacade;

  private readonly readUseCase = InjectionPlatformEntitiesUserUseCase.UserReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesUserUseCase.UserSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesUserUseCase.UserUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesUserUseCase.UserDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesUserUseCase.UserListUseCase();

  public static getInstance(): UserFacade {
    if (!UserFacade.instance)
      UserFacade.instance = new UserFacade();
    return UserFacade.instance;
  }

  public async read(params: IUserReadDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IUserSaveDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IUserUpdateDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IUserDeleteDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IUserDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}