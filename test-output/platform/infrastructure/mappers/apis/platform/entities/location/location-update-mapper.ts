import { Mapper } from "@bus/core/classes";
import { ILocationUpdateDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationUpdateMapper extends Mapper<ILocationUpdateEntity, ILocationUpdateDTO> {

  private static instance: LocationUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): LocationUpdateMapper {
    if (!LocationUpdateMapper.instance)
      LocationUpdateMapper.instance = new LocationUpdateMapper();
    return LocationUpdateMapper.instance;
  }

  public mapFrom(param: ILocationUpdateEntity): ILocationUpdateDTO {
    return {
      companyId: param.company_id,
      countryId: param.country_id,
      name: param.name,
      address: param.address,
      city: param.city,
      phone: param.phone,
      email: param.email,
      mainLocation: param.main_location,
      state: param.state
    };
  }

  public mapFromList(params: ILocationUpdateEntity[]): ILocationUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationUpdateDTO): ILocationUpdateEntity {
    return {
      company_id: param.companyId,
      country_id: param.countryId,
      name: param.name,
      address: param.address,
      city: param.city,
      phone: param.phone,
      email: param.email,
      main_location: param.mainLocation,
      state: param.state
    };
  }

  public mapToList(params: ILocationUpdateDTO[]): ILocationUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}