export interface IUserUpdateDTO {
  platformId?: string;
  password?: string;
  email?: string;
  identification?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  refreshToken?: string;
  state?: boolean;
}