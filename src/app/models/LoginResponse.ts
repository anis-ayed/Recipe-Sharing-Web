import { UserRole } from '../enums/UserRole';

export interface LoginResponse {
  userId: string;
  token: string;
  role: UserRole;
}
