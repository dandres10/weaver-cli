import { AVAILABILITY_APPOINTMENT_TABLE_ENUM } from "./availability-appointment-table-enum-request-dto";

export interface IAvailabilityAppointmentTableFilterManagerRequestDTO {
  field: string;
  condition: AVAILABILITY_APPOINTMENT_TABLE_ENUM;
  value?: any;
  group?: number;
  initialValue?: any;
  finalValue?: any;
}