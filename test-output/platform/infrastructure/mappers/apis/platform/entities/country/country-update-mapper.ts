import { Mapper } from "@bus/core/classes";
import { ICountryUpdateDTO } from "@bus/domain/models/apis/platform/entities/country";
import { ICountryUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/country";

export class CountryUpdateMapper extends Mapper<ICountryUpdateEntity, ICountryUpdateDTO> {

  private static instance: CountryUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): CountryUpdateMapper {
    if (!CountryUpdateMapper.instance)
      CountryUpdateMapper.instance = new CountryUpdateMapper();
    return CountryUpdateMapper.instance;
  }

  public mapFrom(param: ICountryUpdateEntity): ICountryUpdateDTO {
    return {
      name: param.name,
      code: param.code,
      phoneCode: param.phone_code,
      state: param.state
    };
  }

  public mapFromList(params: ICountryUpdateEntity[]): ICountryUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICountryUpdateDTO): ICountryUpdateEntity {
    return {
      name: param.name,
      code: param.code,
      phone_code: param.phoneCode,
      state: param.state
    };
  }

  public mapToList(params: ICountryUpdateDTO[]): ICountryUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}