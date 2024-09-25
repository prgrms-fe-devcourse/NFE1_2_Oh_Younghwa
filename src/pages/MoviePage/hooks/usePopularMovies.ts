// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getPopularMovies } from '../api/tmdbApi';

export const usePopularMovies = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['popular'], // 쿼리 키
    queryFn: getPopularMovies, // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
