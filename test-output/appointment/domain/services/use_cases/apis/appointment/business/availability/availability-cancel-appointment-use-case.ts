import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityCancelAppointmentRequestDTO, IAvailabilityCancelAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityCancelAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-cancel-appointment-mapper";
import { InjectionAppointmentBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityCancelAppointmentUseCase implements UseCase<IAvailabilityCancelAppointmentRequestDTO, IAvailabilityCancelAppointmentResponseDTO | null> {
  private static instance: AvailabilityCancelAppointmentUseCase;
  private repository = InjectionAppointmentBusinessRepository.AvailabilityRepository();
  private mapper = InjectionAppointmentBusinessAvailabilityCancelAppointmentMapper.AvailabilityCancelAppointmentRequestMapper();

  public static getInstance(): AvailabilityCancelAppointmentUseCase {
    if (!AvailabilityCancelAppointmentUseCase.instance)
      AvailabilityCancelAppointmentUseCase.instance = new AvailabilityCancelAppointmentUseCase();
    return AvailabilityCancelAppointmentUseCase.instance;
  }

  public async execute(params: IAvailabilityCancelAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityCancelAppointmentResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.cancelAppointment(paramsEntity, config).then((data) => data ?? null);
  }
}