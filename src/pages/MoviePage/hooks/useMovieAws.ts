// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getMovieAwsApi } from '../api/movieAwsApi';
import { getPopularMovies } from '../api/tmdbApi';

export const useMovieAws = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['aws_movie_data'], // 쿼리 키
    queryFn: getMovieAwsApi, // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
