import { validateTokenAxiosClient } from '../../shared/utils/axiosClient';

export const validateTokenRequest = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const request = validateTokenAxiosClient(token);
    const response = await request.get('/auth-user');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('토큰 검증 실패');
  }
};
