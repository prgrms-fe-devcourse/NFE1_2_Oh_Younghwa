import { User } from '../../../auth/model/user';

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  user: User;
};
