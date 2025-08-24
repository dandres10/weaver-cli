import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityScheduleAppointmentRequestDTO, IAvailabilityScheduleAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityScheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-schedule-appointment-mapper";
import { InjectionAppointmentBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityScheduleAppointmentUseCase implements UseCase<IAvailabilityScheduleAppointmentRequestDTO, IAvailabilityScheduleAppointmentResponseDTO | null> {
  private static instance: AvailabilityScheduleAppointmentUseCase;
  private repository = InjectionAppointmentBusinessRepository.AvailabilityRepository();
  private mapper = InjectionAppointmentBusinessAvailabilityScheduleAppointmentMapper.AvailabilityScheduleAppointmentRequestMapper();

  public static getInstance(): AvailabilityScheduleAppointmentUseCase {
    if (!AvailabilityScheduleAppointmentUseCase.instance)
      AvailabilityScheduleAppointmentUseCase.instance = new AvailabilityScheduleAppointmentUseCase();
    return AvailabilityScheduleAppointmentUseCase.instance;
  }

  public async execute(params: IAvailabilityScheduleAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityScheduleAppointmentResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.scheduleAppointment(paramsEntity, config).then((data) => data ?? null);
  }
}