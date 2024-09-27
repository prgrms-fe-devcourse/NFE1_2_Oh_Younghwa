import { User } from '../../../auth/model/user';
import { loginUserAxiosClient, validateTokenAxiosClient } from '../../../shared/utils/axiosClient';

export const getUsers = async (): Promise<User> => {
  const response = await loginUserAxiosClient.get<User>('/users/get-users');
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const request = validateTokenAxiosClient(token);
    const response = await request.post('/logout', {});
    localStorage.removeItem('token');

    return response.data;
  } catch {
    console.log('로그아웃 실패');
    throw new Error('로그아웃 실패');
  }
};
