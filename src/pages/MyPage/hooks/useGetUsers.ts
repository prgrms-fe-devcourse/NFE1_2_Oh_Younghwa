import { useQuery } from '@tanstack/react-query';

import { validateTokenRequest } from '../../../auth/api/authentication';
import { User } from '../../TimelinePage/model/article'; //article에 있는 User 모델 사용

//내 마이페이지 보기
export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => validateTokenRequest(),
  });
  return { data, isLoading, error };
};
