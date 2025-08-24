import { AvailabilityAppointmentTableEnum } from "./availability-appointment-table-enum-request-dto";

export interface IAvailabilityAppointmentTableFilterManagerRequestDTO {
  field: string;
  condition: AvailabilityAppointmentTableEnum;
  value?: any;
  group?: number;
  initialValue?: any;
  finalValue?: any;
}