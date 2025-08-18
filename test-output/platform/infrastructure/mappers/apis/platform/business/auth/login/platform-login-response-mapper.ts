import { Mapper } from "@bus/core/classes";
import { IPlatformLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IPlatformLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class PlatformLoginResponseMapper extends Mapper<IPlatformLoginResponseEntity, IPlatformLoginResponseDTO> {

    private static instance: PlatformLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): PlatformLoginResponseMapper {
        if (!PlatformLoginResponseMapper.instance)
            PlatformLoginResponseMapper.instance = new PlatformLoginResponseMapper();
        return PlatformLoginResponseMapper.instance;
    }

    public mapFrom(param: IPlatformLoginResponseEntity): IPlatformLoginResponseDTO {
        return {
            id: param.id,
            languageId: param.language_id,
            locationId: param.location_id,
            tokenExpirationMinutes: param.token_expiration_minutes,
            currencyId: param.currency_id
        }
    }

    public mapFromList(params: IPlatformLoginResponseEntity[]): IPlatformLoginResponseDTO[] {
        return params.map((param: IPlatformLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPlatformLoginResponseDTO): IPlatformLoginResponseEntity {
        return {
            id: param.id,
            language_id: param.languageId,
            location_id: param.locationId,
            token_expiration_minutes: param.tokenExpirationMinutes,
            currency_id: param.currencyId
        }
    }

    public mapToList(params: IPlatformLoginResponseDTO[]): IPlatformLoginResponseEntity[] {
        return params.map((param: IPlatformLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}