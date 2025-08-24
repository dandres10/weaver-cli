import { IAvailabilityAppointmentTableFilterManagerRequestDTO } from "./i-availability-appointment-table-filter-manager-request-dto";

export interface IAvailabilityAppointmentTableRequestDTO {
  skip?: number;
  limit?: number;
  allData?: boolean;
  filters?: IAvailabilityAppointmentTableFilterManagerRequestDTO[];
}