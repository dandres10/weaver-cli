import { AvailabilityAppointmentTableEnum } from "./availability-appointment-table-enum-request-entity";

export interface IAvailabilityAppointmentTableFilterManagerRequestEntity {
  field: string;
  condition: AvailabilityAppointmentTableEnum;
  value?: any;
  group?: number;
  initialValue?: any;
  finalValue?: any;
}