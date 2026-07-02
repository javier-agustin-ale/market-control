import { ProfileUserType } from '../../types/profile-user.type';

export interface Auth {
  message: string;
  token: string;
  user: User;
}

interface User {
  userId: number;
  username: string;
  email: string;
  role: ProfileUserType;
}
