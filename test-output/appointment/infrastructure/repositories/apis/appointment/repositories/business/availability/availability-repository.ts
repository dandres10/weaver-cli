import { IConfigDTO } from "@bus/core/interfaces";
import appointmentAxios from "@bus/core/axios/appointment-axios";
import { CONST_APPOINTMENT_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IAvailabilityRepository } from "@appointment/domain/services/repositories/apis/appointment/business/i-availability-repository";
import { IAvailabilityServicesByLocationResponseDTO, IAvailabilityCollaboratorsAvailabilityResponseDTO, IAvailabilityScheduleAppointmentResponseDTO, IAvailabilityCancelAppointmentResponseDTO, IAvailabilityRescheduleAppointmentResponseDTO, IAvailabilityAppointmentTableResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityServicesByLocationRequestEntity, IAvailabilityServicesByLocationResponseEntity, IAvailabilityCollaboratorsAvailabilityRequestEntity, IAvailabilityCollaboratorsAvailabilityResponseEntity, IAvailabilityScheduleAppointmentRequestEntity, IAvailabilityScheduleAppointmentResponseEntity, IAvailabilityCancelAppointmentRequestEntity, IAvailabilityCancelAppointmentResponseEntity, IAvailabilityRescheduleAppointmentRequestEntity, IAvailabilityRescheduleAppointmentResponseEntity, IAvailabilityAppointmentTableRequestEntity, IAvailabilityAppointmentTableResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionPlatformBusinessAvailabilityServicesByLocationMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-services-by-location-mapper";
import { InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-collaborators-availability-mapper";
import { InjectionPlatformBusinessAvailabilityScheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-schedule-appointment-mapper";
import { InjectionPlatformBusinessAvailabilityCancelAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-cancel-appointment-mapper";
import { InjectionPlatformBusinessAvailabilityRescheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-reschedule-appointment-mapper";
import { InjectionPlatformBusinessAvailabilityAppointmentTableMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-appointment-table-mapper";

export class AvailabilityRepository extends IAvailabilityRepository {

  private static instance: AvailabilityRepository;
  private readonly resolve = InjectionCore.Resolve();
  private servicesByLocationResponseMapper = InjectionPlatformBusinessAvailabilityServicesByLocationMapper.AvailabilityServicesByLocationResponseMapper();
  private collaboratorsAvailabilityResponseMapper = InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper.AvailabilityCollaboratorsAvailabilityResponseMapper();
  private scheduleAppointmentResponseMapper = InjectionPlatformBusinessAvailabilityScheduleAppointmentMapper.AvailabilityScheduleAppointmentResponseMapper();
  private cancelAppointmentResponseMapper = InjectionPlatformBusinessAvailabilityCancelAppointmentMapper.AvailabilityCancelAppointmentResponseMapper();
  private rescheduleAppointmentResponseMapper = InjectionPlatformBusinessAvailabilityRescheduleAppointmentMapper.AvailabilityRescheduleAppointmentResponseMapper();
  private appointmentTableResponseMapper = InjectionPlatformBusinessAvailabilityAppointmentTableMapper.AvailabilityAppointmentTableResponseMapper();

  private constructor() {
    super();
  }

  public static getInstance(): AvailabilityRepository {
    if (!AvailabilityRepository.instance)
      AvailabilityRepository.instance = new AvailabilityRepository();
    return AvailabilityRepository.instance;
  }

  public async servicesByLocation(
    params: IAvailabilityServicesByLocationRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityServicesByLocationResponseDTO[] | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_SERVICES_BY_LOCATION, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityServicesByLocationResponseEntity[]>(data);
          if (entity)
            return this.servicesByLocationResponseMapper.mapFromList(entity);
          return null;
        });
    return null;
  }

  public async collaboratorsAvailability(
    params: IAvailabilityCollaboratorsAvailabilityRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityCollaboratorsAvailabilityResponseDTO | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_COLLABORATORS_AVAILABILITY, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityCollaboratorsAvailabilityResponseEntity>(data);
          if (entity)
            return this.collaboratorsAvailabilityResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async scheduleAppointment(
    params: IAvailabilityScheduleAppointmentRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityScheduleAppointmentResponseDTO | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_SCHEDULE_APPOINTMENT, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityScheduleAppointmentResponseEntity>(data);
          if (entity)
            return this.scheduleAppointmentResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async cancelAppointment(
    params: IAvailabilityCancelAppointmentRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityCancelAppointmentResponseDTO | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_CANCEL_APPOINTMENT, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityCancelAppointmentResponseEntity>(data);
          if (entity)
            return this.cancelAppointmentResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async rescheduleAppointment(
    params: IAvailabilityRescheduleAppointmentRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityRescheduleAppointmentResponseDTO | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_RESCHEDULE_APPOINTMENT, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityRescheduleAppointmentResponseEntity>(data);
          if (entity)
            return this.rescheduleAppointmentResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async appointmentTable(
    params: IAvailabilityAppointmentTableRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAvailabilityAppointmentTableResponseDTO[] | null> {
    if (config.loadService)
      return appointmentAxios
        .post(CONST_APPOINTMENT_API_ROUTES.AVAILABILITY_APPOINTMENT_TABLE, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAvailabilityAppointmentTableResponseEntity[]>(data);
          if (entity)
            return this.appointmentTableResponseMapper.mapFromList(entity);
          return null;
        });
    return null;
  }
}