import { Mapper } from "@bus/core/classes";
import { ICountryDeleteDTO } from "@bus/domain/models/apis/platform/entities/country";
import { ICountryDeleteEntity } from "@bus/infrastructure/entities/apis/platform/entities/country";

export class CountryDeleteMapper extends Mapper<ICountryDeleteEntity, ICountryDeleteDTO> {

  private static instance: CountryDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): CountryDeleteMapper {
    if (!CountryDeleteMapper.instance)
      CountryDeleteMapper.instance = new CountryDeleteMapper();
    return CountryDeleteMapper.instance;
  }

  public mapFrom(param: ICountryDeleteEntity): ICountryDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICountryDeleteEntity[]): ICountryDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICountryDeleteDTO): ICountryDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICountryDeleteDTO[]): ICountryDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}