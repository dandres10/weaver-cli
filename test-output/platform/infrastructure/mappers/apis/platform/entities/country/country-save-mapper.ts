import { Mapper } from "@bus/core/classes";
import { ICountrySaveDTO } from "@bus/domain/models/apis/platform/entities/country";
import { ICountrySaveEntity } from "@bus/infrastructure/entities/apis/platform/entities/country";

export class CountrySaveMapper extends Mapper<ICountrySaveEntity, ICountrySaveDTO> {

  private static instance: CountrySaveMapper;
  public constructor() { super(); }

  public static getInstance(): CountrySaveMapper {
    if (!CountrySaveMapper.instance)
      CountrySaveMapper.instance = new CountrySaveMapper();
    return CountrySaveMapper.instance;
  }

  public mapFrom(param: ICountrySaveEntity): ICountrySaveDTO {
    return {
      name: param.name,
      code: param.code,
      phoneCode: param.phone_code,
      state: param.state
    };
  }

  public mapFromList(params: ICountrySaveEntity[]): ICountrySaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICountrySaveDTO): ICountrySaveEntity {
    return {
      name: param.name,
      code: param.code,
      phone_code: param.phoneCode,
      state: param.state ?? true
    };
  }

  public mapToList(params: ICountrySaveDTO[]): ICountrySaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}