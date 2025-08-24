import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IAvailabilityCollaboratorsAvailabilityRequestDTO, IAvailabilityCollaboratorsAvailabilityResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-collaborators-availability-mapper";
import { InjectionPlatformBusinessRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/business/injection-appointment-business-repository";

export class AvailabilityCollaboratorsAvailabilityUseCase implements UseCase<IAvailabilityCollaboratorsAvailabilityRequestDTO, IAvailabilityCollaboratorsAvailabilityResponseDTO | null> {
  private static instance: AvailabilityCollaboratorsAvailabilityUseCase;
  private repository = InjectionPlatformBusinessRepository.AvailabilityRepository();
  private mapper = InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper.AvailabilityCollaboratorsAvailabilityRequestMapper();

  public static getInstance(): AvailabilityCollaboratorsAvailabilityUseCase {
    if (!AvailabilityCollaboratorsAvailabilityUseCase.instance)
      AvailabilityCollaboratorsAvailabilityUseCase.instance = new AvailabilityCollaboratorsAvailabilityUseCase();
    return AvailabilityCollaboratorsAvailabilityUseCase.instance;
  }

  public async execute(params: IAvailabilityCollaboratorsAvailabilityRequestDTO, config?: IConfigDTO): Promise<IAvailabilityCollaboratorsAvailabilityResponseDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.collaboratorsAvailability(paramsEntity, config).then((data) => data ?? null);
  }
}