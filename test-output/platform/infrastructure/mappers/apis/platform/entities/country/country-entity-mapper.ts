import { Mapper } from "@bus/core/classes";
import { ICountryDTO } from "@platform/domain/models/apis/platform/entities/country";
import { ICountryEntity } from "@platform/infrastructure/entities/apis/platform/entities/country";

export class CountryEntityMapper extends Mapper<ICountryEntity, ICountryDTO> {
  private static instance: CountryEntityMapper;
  public constructor() { super(); }

  public static getInstance(): CountryEntityMapper {
    if (!CountryEntityMapper.instance)
      CountryEntityMapper.instance = new CountryEntityMapper();
    return CountryEntityMapper.instance;
  }

  public mapFrom(param: ICountryEntity): ICountryDTO {
    return {
      name: param.name,
      code: param.code,
      phoneCode: param.phone_code,
      state: param.state
    };
  }

  public mapFromList(params: ICountryEntity[]): ICountryDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICountryDTO): ICountryEntity {
    return {
      name: param.name,
      code: param.code,
      phone_code: param.phoneCode,
      state: param.state
    };
  }

  public mapToList(params: ICountryDTO[]): ICountryEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}