export interface ICompanyListRequestDTO {
  skip?: number;
  limit?: number;
  allData?: boolean;
  filters?: Any[]RequestDTO;
}