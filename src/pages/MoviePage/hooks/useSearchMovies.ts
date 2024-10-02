// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getSearchedMovies } from '../api/tmdbApi';
import { MovieListResponse } from '../model/movie';
type SearchedMovies = {
  data: MovieListResponse | undefined;
  isError: boolean;
  isLoading: boolean;
};
export const useSearchedMovies = (keyword: string): SearchedMovies => {
  const { data, isError, isLoading, } = useQuery({
    queryKey: ['movie_search', keyword], // 쿼리 키
    queryFn: () => getSearchedMovies(keyword), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
