// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '../../pages/TimelinePage/model/article';
import { getUserDataById } from '../api/userApi';

export const useGetUserDataById = (userId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user_data', userId], // 쿼리 키
    queryFn: () => getUserDataById(userId), // 데이터를 가져오는 함수
  });

  return { data, isError, isLoading };
};
