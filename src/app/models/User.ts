import { UserRole } from '../enums/UserRole';

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  role?: UserRole;
}
