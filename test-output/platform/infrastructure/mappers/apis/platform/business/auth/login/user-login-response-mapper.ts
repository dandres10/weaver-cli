import { Mapper } from "@bus/core/classes";
import { IUserLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth/login";
import { IUserLoginResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/login";

export class UserLoginResponseMapper extends Mapper<IUserLoginResponseEntity, IUserLoginResponseDTO> {

    private static instance: UserLoginResponseMapper;

    public constructor() { super(); }

    public static getInstance(): UserLoginResponseMapper {
        if (!UserLoginResponseMapper.instance)
            UserLoginResponseMapper.instance = new UserLoginResponseMapper();
        return UserLoginResponseMapper.instance;
    }

    public mapFrom(param: IUserLoginResponseEntity): IUserLoginResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IUserLoginResponseEntity[]): IUserLoginResponseDTO[] {
        return params.map((param: IUserLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IUserLoginResponseDTO): IUserLoginResponseEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IUserLoginResponseDTO[]): IUserLoginResponseEntity[] {
        return params.map((param: IUserLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }
}