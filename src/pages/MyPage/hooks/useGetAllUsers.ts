import { useQuery } from '@tanstack/react-query';

import { User } from '../../TimelinePage/model/article'; //article에 있는 User 모델 사용
import { getAllUsers } from '../api/userApi';

//다른 사람의 fullName 찾기 위해 모든 유저 불러오기
export const useGetAllUsers = () => {
  const { data, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['allUsers'],
    queryFn: () => getAllUsers(),
  });
  return { data, isLoading, error };
};
