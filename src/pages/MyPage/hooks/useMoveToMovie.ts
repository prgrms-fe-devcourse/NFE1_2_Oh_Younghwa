import { useQuery } from '@tanstack/react-query';

import { MovieListResponse } from '../../MoviePage/model/movie';
import { moveToMovies } from '../api/userApi';

type SearchedMovies = {
  data: MovieListResponse | undefined;
  isError: boolean;
  isLoading: boolean;
};
export const useMoveToMovie = (keyword: string): SearchedMovies => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['movie_search', keyword], // 쿼리 키
    queryFn: () => moveToMovies(keyword), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
