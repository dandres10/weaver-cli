import { IConfigDTO } from "@bus/core/interfaces";
import {
  IAvailabilityServicesByLocationRequestDTO,
  IAvailabilityServicesByLocationResponseDTO,
  IAvailabilityCollaboratorsAvailabilityRequestDTO,
  IAvailabilityCollaboratorsAvailabilityResponseDTO,
  IAvailabilityScheduleAppointmentRequestDTO,
  IAvailabilityScheduleAppointmentResponseDTO,
  IAvailabilityCancelAppointmentRequestDTO,
  IAvailabilityCancelAppointmentResponseDTO,
  IAvailabilityRescheduleAppointmentRequestDTO,
  IAvailabilityRescheduleAppointmentResponseDTO,
  IAvailabilityAppointmentTableRequestDTO,
  IAvailabilityAppointmentTableResponseDTO,
} from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionPlatformBusinessAvailabilityUseCase } from "@appointment/domain/services/use_cases/apis/appointment/injection/business/injection-appointment-business-availability-use-case";

export class AvailabilityFacade {
  private static instance: AvailabilityFacade;

  private readonly servicesByLocationUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityServicesByLocationUseCase();
  private readonly collaboratorsAvailabilityUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityCollaboratorsAvailabilityUseCase();
  private readonly scheduleAppointmentUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityScheduleAppointmentUseCase();
  private readonly cancelAppointmentUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityCancelAppointmentUseCase();
  private readonly rescheduleAppointmentUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityRescheduleAppointmentUseCase();
  private readonly appointmentTableUseCase = InjectionPlatformBusinessAvailabilityUseCase.AvailabilityAppointmentTableUseCase();

  public static getInstance(): AvailabilityFacade {
    if (!AvailabilityFacade.instance)
      AvailabilityFacade.instance = new AvailabilityFacade();
    return AvailabilityFacade.instance;
  }

  public async servicesByLocation(params: IAvailabilityServicesByLocationRequestDTO, config?: IConfigDTO): Promise<IAvailabilityServicesByLocationResponseDTO | null> {
    return await this.servicesByLocationUseCase.execute(params, config);
  }

  public async collaboratorsAvailability(params: IAvailabilityCollaboratorsAvailabilityRequestDTO, config?: IConfigDTO): Promise<IAvailabilityCollaboratorsAvailabilityResponseDTO | null> {
    return await this.collaboratorsAvailabilityUseCase.execute(params, config);
  }

  public async scheduleAppointment(params: IAvailabilityScheduleAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityScheduleAppointmentResponseDTO | null> {
    return await this.scheduleAppointmentUseCase.execute(params, config);
  }

  public async cancelAppointment(params: IAvailabilityCancelAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityCancelAppointmentResponseDTO | null> {
    return await this.cancelAppointmentUseCase.execute(params, config);
  }

  public async rescheduleAppointment(params: IAvailabilityRescheduleAppointmentRequestDTO, config?: IConfigDTO): Promise<IAvailabilityRescheduleAppointmentResponseDTO | null> {
    return await this.rescheduleAppointmentUseCase.execute(params, config);
  }

  public async appointmentTable(params: IAvailabilityAppointmentTableRequestDTO, config?: IConfigDTO): Promise<IAvailabilityAppointmentTableResponseDTO | null> {
    return await this.appointmentTableUseCase.execute(params, config);
  }
}