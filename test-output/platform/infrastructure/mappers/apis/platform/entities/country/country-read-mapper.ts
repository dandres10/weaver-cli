import { Mapper } from "@bus/core/classes";
import { ICountryReadDTO } from "@platform/domain/models/apis/platform/entities/country";
import { ICountryReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/country";

export class CountryReadMapper extends Mapper<ICountryReadEntity, ICountryReadDTO> {

  private static instance: CountryReadMapper;
  public constructor() { super(); }

  public static getInstance(): CountryReadMapper {
    if (!CountryReadMapper.instance)
      CountryReadMapper.instance = new CountryReadMapper();
    return CountryReadMapper.instance;
  }

  public mapFrom(param: ICountryReadEntity): ICountryReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICountryReadEntity[]): ICountryReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICountryReadDTO): ICountryReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICountryReadDTO[]): ICountryReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}