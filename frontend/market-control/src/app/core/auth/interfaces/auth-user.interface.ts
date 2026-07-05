import { ProfileUserType } from '../../interfaces/profile-user.type';

export interface AuthUser {
  userId: number;
  username: string;
  email: string;
  role: ProfileUserType;
}
