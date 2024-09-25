// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { validateTokenRequest } from '../api/authentication';
import { User } from '../model/user';

export const useTokenValidation = () => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['auth-user'],
    queryFn: () => validateTokenRequest(),
    retry: 0,
  });

  return { data, isLoading, error };
};
