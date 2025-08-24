import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityServicesByLocationRequestDTO, IAvailabilityServicesByLocationResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityServicesByLocationMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-services-by-location-mapper";
import { InjectionAppointmentBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityServicesByLocationUseCase implements UseCase<IAvailabilityServicesByLocationRequestDTO, IAvailabilityServicesByLocationResponseDTO[] | null> {
  private static instance: AvailabilityServicesByLocationUseCase;
  private repository = InjectionAppointmentBusinessRepository.AvailabilityRepository();
  private mapper = InjectionAppointmentBusinessAvailabilityServicesByLocationMapper.AvailabilityServicesByLocationRequestMapper();

  public static getInstance(): AvailabilityServicesByLocationUseCase {
    if (!AvailabilityServicesByLocationUseCase.instance)
      AvailabilityServicesByLocationUseCase.instance = new AvailabilityServicesByLocationUseCase();
    return AvailabilityServicesByLocationUseCase.instance;
  }

  public async execute(params: IAvailabilityServicesByLocationRequestDTO, config?: IConfigDTO): Promise<IAvailabilityServicesByLocationResponseDTO[] | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.servicesByLocation(paramsEntity, config).then((data) => data ?? null);
  }
}