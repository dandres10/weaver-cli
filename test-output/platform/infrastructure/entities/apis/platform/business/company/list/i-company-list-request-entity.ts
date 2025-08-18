export interface ICompanyListRequestEntity {
  skip?: number;
  limit?: number;
  all_data?: boolean;
  filters?: IAny[]Entity;
}
