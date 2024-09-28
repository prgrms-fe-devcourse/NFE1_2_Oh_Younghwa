import { useQuery } from '@tanstack/react-query';

import { validateTokenRequest } from '../../../auth/api/authentication';
import { User } from '../../TimelinePage/model/article';

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => validateTokenRequest(),
  });
  return { data, isLoading, error };
};
