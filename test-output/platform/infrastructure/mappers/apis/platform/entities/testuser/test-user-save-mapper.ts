import { Mapper } from "@bus/core/classes";
import { ITestUserSaveDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export class TestUserSaveMapper extends Mapper<ITestUserSaveEntity, ITestUserSaveDTO> {

  private static instance: TestUserSaveMapper;
  public constructor() { super(); }

  public static getInstance(): TestUserSaveMapper {
    if (!TestUserSaveMapper.instance)
      TestUserSaveMapper.instance = new TestUserSaveMapper();
    return TestUserSaveMapper.instance;
  }

  public mapFrom(param: ITestUserSaveEntity): ITestUserSaveDTO {
    return {
      name: param.name,
      state: param.state
    };
  }

  public mapFromList(params: ITestUserSaveEntity[]): ITestUserSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITestUserSaveDTO): ITestUserSaveEntity {
    return {
      name: param.name,
      state: param.state ?? true
    };
  }

  public mapToList(params: ITestUserSaveDTO[]): ITestUserSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}