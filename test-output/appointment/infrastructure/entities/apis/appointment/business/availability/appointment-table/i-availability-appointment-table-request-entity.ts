import { IAvailabilityAppointmentTableFilterManagerRequestEntity } from "./i-availability-appointment-table-filter-manager-request-entity";

export interface IAvailabilityAppointmentTableRequestEntity {
  skip?: number;
  limit?: number;
  all_data?: boolean;
  filters?: IAvailabilityAppointmentTableFilterManagerRequestEntity[];
}