export interface IAvailabilityAppointmentTableFilterManagerRequestEntity {
  field: string;
  condition: enum;
  value?: any;
  group?: number;
  initialValue?: any;
  finalValue?: any;
}