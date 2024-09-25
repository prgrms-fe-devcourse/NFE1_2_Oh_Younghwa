import { authAxiosClient } from '../../../shared/utils/axiosClient';

type SignUpRequest = {
  email: string;
  fullName: string;
  password: string;
};

export const postSignUpRequest = async (data: SignUpRequest) => {
  try {
    const response = await authAxiosClient.post('/signup', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('회원가입 실패');
  }
};
