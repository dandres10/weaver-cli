import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityRescheduleAppointmentRequestDTO, IAvailabilityRescheduleAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityRescheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-reschedule-appointment-mapper";
import { InjectionAppointmentBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityRescheduleAppointmentUseCase implements UseCase<IAvailabilityRescheduleAppointmentRequestDTO, IAvailabilityRescheduleAppointmentResponseDTO | null> {
  private static instance: AvailabilityRescheduleAppointmentUseCase;
  private repository = InjectionAppointmentBusinessRepository.AvailabilityRepository();
  private mapper = InjectionAppointmentBusinessAvailabilityRescheduleAppointmentMapper.AvailabilityRescheduleAppointmentRequestMapper();

  public static getInstance(): AvailabilityRescheduleAppointmentUseCase {
    if (!AvailabilityRescheduleAppointmentUseCase.instance)
      AvailabilityRescheduleAppointmentUseCase.instance = new AvailabilityRescheduleAppointmentUseCase();
    return AvailabilityRescheduleAppointmentUseCase.instance;
  }

  public async execute(params: IAvailabilityRescheduleAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityRescheduleAppointmentResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.rescheduleAppointment(paramsEntity, config).then((data) => data ?? null);
  }
}