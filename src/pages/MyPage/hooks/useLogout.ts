import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { logoutUser } from '../api/userApi';

export const useLogout = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      console.log(`로그아웃되었습니다.`);
      navigate('/login');
    },
    onError: () => {
      console.log('로그아웃 실패');
    },
  });
  return logoutMutation;
};
