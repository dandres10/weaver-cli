import { Mapper } from "@bus/core/classes";
import { ITestUserDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export class TestUserEntityMapper extends Mapper<ITestUserEntity, ITestUserDTO> {
  private static instance: TestUserEntityMapper;
  public constructor() { super(); }

  public static getInstance(): TestUserEntityMapper {
    if (!TestUserEntityMapper.instance)
      TestUserEntityMapper.instance = new TestUserEntityMapper();
    return TestUserEntityMapper.instance;
  }

  public mapFrom(param: ITestUserEntity): ITestUserDTO {
    return {
      id: param.id,
      id: param.id,
      name: param.name,
      state: param.state
    };
  }

  public mapFromList(params: ITestUserEntity[]): ITestUserDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITestUserDTO): ITestUserEntity {
    return {
      id: param.id,
      id: param.id,
      name: param.name,
      state: param.state
    };
  }

  public mapToList(params: ITestUserDTO[]): ITestUserEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}