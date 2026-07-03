import { ProfileUserType } from '../../types/profile-user.type';

export interface UserData {
  userId: number;
  username: string;
  email: string;
  role: ProfileUserType;
}
