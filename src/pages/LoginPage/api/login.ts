import { authAxiosClient } from '../../../shared/utils/axiosClient';
import { LoginRequest, LoginResponse } from '../model/login';

export const postLoginRequest = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authAxiosClient.post('/login', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('로그인 실패');
  }
};
