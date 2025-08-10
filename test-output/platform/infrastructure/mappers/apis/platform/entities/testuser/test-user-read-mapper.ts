import { Mapper } from "@bus/core/classes";
import { ITestUserReadDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export class TestUserReadMapper extends Mapper<ITestUserReadEntity, ITestUserReadDTO> {

  private static instance: TestUserReadMapper;
  public constructor() { super(); }

  public static getInstance(): TestUserReadMapper {
    if (!TestUserReadMapper.instance)
      TestUserReadMapper.instance = new TestUserReadMapper();
    return TestUserReadMapper.instance;
  }

  public mapFrom(param: ITestUserReadEntity): ITestUserReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ITestUserReadEntity[]): ITestUserReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITestUserReadDTO): ITestUserReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ITestUserReadDTO[]): ITestUserReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}