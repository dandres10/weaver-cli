import { Mapper } from "@bus/core/classes";
import { ILocationSaveDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationSaveMapper extends Mapper<ILocationSaveEntity, ILocationSaveDTO> {

  private static instance: LocationSaveMapper;
  public constructor() { super(); }

  public static getInstance(): LocationSaveMapper {
    if (!LocationSaveMapper.instance)
      LocationSaveMapper.instance = new LocationSaveMapper();
    return LocationSaveMapper.instance;
  }

  public mapFrom(param: ILocationSaveEntity): ILocationSaveDTO {
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

  public mapFromList(params: ILocationSaveEntity[]): ILocationSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationSaveDTO): ILocationSaveEntity {
    return {
      company_id: param.companyId,
      country_id: param.countryId,
      name: param.name,
      address: param.address,
      city: param.city,
      phone: param.phone,
      email: param.email,
      main_location: param.mainLocation ?? false,
      state: param.state ?? true
    };
  }

  public mapToList(params: ILocationSaveDTO[]): ILocationSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}