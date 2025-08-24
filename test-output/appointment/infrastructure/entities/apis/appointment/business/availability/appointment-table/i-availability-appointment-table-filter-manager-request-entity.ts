import { AVAILABILITY_APPOINTMENT_TABLE_ENUM } from "./availability-appointment-table-enum-request-entity";

export interface IAvailabilityAppointmentTableFilterManagerRequestEntity {
  field: string;
  condition: AVAILABILITY_APPOINTMENT_TABLE_ENUM;
  value?: any;
  group?: number;
  initialValue?: any;
  finalValue?: any;
}