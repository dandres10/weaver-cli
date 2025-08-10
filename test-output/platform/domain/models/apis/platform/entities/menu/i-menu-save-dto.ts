export interface IMenuSaveDTO {
  companyId?: string;
  name: string;
  label: string;
  description: string;
  topId?: string;
  route: string;
  state?: boolean;
  icon: string;
}