import { useQuery } from '@tanstack/react-query';

import { User } from '../../TimelinePage/model/article'; //article에 있는 User 모델 사용
import { getOtherUsers } from '../api/userApi';

//다른 사람의 마이페이지 보기
export const useGetOtherUsers = (userId: string) => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['otherUsers', userId],
    queryFn: () => getOtherUsers(userId),
  });
  return { data, isLoading, error };
};
