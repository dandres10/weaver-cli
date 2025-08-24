import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityAppointmentTableRequestDTO, IAvailabilityAppointmentTableResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityAppointmentTableMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-appointment-table-mapper";
import { InjectionAppointmentBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityAppointmentTableUseCase implements UseCase<IAvailabilityAppointmentTableRequestDTO, IAvailabilityAppointmentTableResponseDTO[] | null> {
  private static instance: AvailabilityAppointmentTableUseCase;
  private repository = InjectionAppointmentBusinessRepository.AvailabilityRepository();
  private mapper = InjectionAppointmentBusinessAvailabilityAppointmentTableMapper.AvailabilityAppointmentTableRequestMapper();

  public static getInstance(): AvailabilityAppointmentTableUseCase {
    if (!AvailabilityAppointmentTableUseCase.instance)
      AvailabilityAppointmentTableUseCase.instance = new AvailabilityAppointmentTableUseCase();
    return AvailabilityAppointmentTableUseCase.instance;
  }

  public async execute(params: IAvailabilityAppointmentTableRequestDTO, config?: IConfigDTO): Promise<IAvailabilityAppointmentTableResponseDTO[] | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.appointmentTable(paramsEntity, config).then((data) => data ?? null);
  }
}