import { Mapper } from "@bus/core/classes";
import { ITestUserUpdateDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export class TestUserUpdateMapper extends Mapper<ITestUserUpdateEntity, ITestUserUpdateDTO> {

  private static instance: TestUserUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): TestUserUpdateMapper {
    if (!TestUserUpdateMapper.instance)
      TestUserUpdateMapper.instance = new TestUserUpdateMapper();
    return TestUserUpdateMapper.instance;
  }

  public mapFrom(param: ITestUserUpdateEntity): ITestUserUpdateDTO {
    return {
      id: param.id,
      name: param.name,
      state: param.state
    };
  }

  public mapFromList(params: ITestUserUpdateEntity[]): ITestUserUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITestUserUpdateDTO): ITestUserUpdateEntity {
    return {
      id: param.id,
      name: param.name,
      state: param.state
    };
  }

  public mapToList(params: ITestUserUpdateDTO[]): ITestUserUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}