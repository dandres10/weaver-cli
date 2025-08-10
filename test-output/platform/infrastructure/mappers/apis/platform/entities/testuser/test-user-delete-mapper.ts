import { Mapper } from "@bus/core/classes";
import { ITestUserDeleteDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export class TestUserDeleteMapper extends Mapper<ITestUserDeleteEntity, ITestUserDeleteDTO> {

  private static instance: TestUserDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): TestUserDeleteMapper {
    if (!TestUserDeleteMapper.instance)
      TestUserDeleteMapper.instance = new TestUserDeleteMapper();
    return TestUserDeleteMapper.instance;
  }

  public mapFrom(param: ITestUserDeleteEntity): ITestUserDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ITestUserDeleteEntity[]): ITestUserDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ITestUserDeleteDTO): ITestUserDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ITestUserDeleteDTO[]): ITestUserDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}