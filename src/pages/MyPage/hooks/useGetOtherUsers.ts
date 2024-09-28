import { useQuery } from '@tanstack/react-query';

import { User } from '../../TimelinePage/model/article';
import { getOtherUsers } from '../api/userApi';

export const useGetOtherUsers = (userId: string) => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['otherUsers', userId],
    queryFn: () => getOtherUsers(userId),
  });
  return { data, isLoading, error };
};
