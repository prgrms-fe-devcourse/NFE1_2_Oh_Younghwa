// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { MovieListResponse } from '../model/movie';
import { getSearchedMovies } from '../api/tmdbApi';
type SearchedMovies = {
  data: MovieListResponse | undefined;
  isError: boolean;
  isLoading: boolean;
};
export const useSearchedMovies = (keyword: string): SearchedMovies => {
  console.log('run');
  const { data, isError, isLoading } = useQuery({
    queryKey: ['movie_search', keyword], // 쿼리 키
    queryFn: () => getSearchedMovies(keyword), // 데이터를 가져오는 함수
    enabled: !!keyword, // keyword가 있을 때만 쿼리 실행
  });
  return { data, isError, isLoading };
};
