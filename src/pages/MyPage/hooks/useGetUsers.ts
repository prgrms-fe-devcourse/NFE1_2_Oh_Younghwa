import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../api/userApi';

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  return { data, isLoading, error };
};
