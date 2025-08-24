import { Mapper } from "@bus/core/classes";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationEntityMapper extends Mapper<ILocationEntity, ILocationDTO> {
  private static instance: LocationEntityMapper;
  public constructor() { super(); }

  public static getInstance(): LocationEntityMapper {
    if (!LocationEntityMapper.instance)
      LocationEntityMapper.instance = new LocationEntityMapper();
    return LocationEntityMapper.instance;
  }

  public mapFrom(param: ILocationEntity): ILocationDTO {
    return {
      id: param.id,
      id: param.id,
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

  public mapFromList(params: ILocationEntity[]): ILocationDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationDTO): ILocationEntity {
    return {
      id: param.id,
      id: param.id,
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

  public mapToList(params: ILocationDTO[]): ILocationEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}