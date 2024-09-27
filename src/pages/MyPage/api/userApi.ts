import { User } from '../../../auth/model/user';
import { loginUserAxiosClient } from '../../../shared/utils/axiosClient';

export const getUsers = async (): Promise<User> => {
  const response = await loginUserAxiosClient.get<User>('/users/get-users');
  return response.data;
};
