import { Mapper } from "@bus/core/classes";
import { ILocationLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";
import { ILocationLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";

export class LocationLoginResponseMapper extends Mapper<ILocationLoginResponseEntity, ILocationLoginResponseDTO> {

    private static instance: LocationLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): LocationLoginResponseMapper {
        if (!LocationLoginResponseMapper.instance)
            LocationLoginResponseMapper.instance = new LocationLoginResponseMapper();
        return LocationLoginResponseMapper.instance;
    }

    public mapFrom(param: ILocationLoginResponseEntity): ILocationLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            mainLocation: param.main_location,
            state: param.state
        }
    }

    public mapFromList(params: ILocationLoginResponseEntity[]): ILocationLoginResponseDTO[] {
        return params.map((param: ILocationLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ILocationLoginResponseDTO): ILocationLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            main_location: param.mainLocation,
            state: param.state
        }
    }

    public mapToList(params: ILocationLoginResponseDTO[]): ILocationLoginResponseEntity[] {
        return params.map((param: ILocationLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}