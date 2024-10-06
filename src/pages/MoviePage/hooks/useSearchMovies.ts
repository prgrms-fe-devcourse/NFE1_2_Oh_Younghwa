// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getSearchedMovies } from '../api/tmdbApi';
import { MovieListResponse } from '../model/movie';
type SearchedMovies = {
  data: MovieListResponse[];
  isError: boolean;
  isLoading: boolean;
};
export const useSearchedMovies = (keyword: string): any => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['movie_search', keyword], // 쿼리 키
    queryFn: () => getSearchedMovies(keyword), // 데이터를 가져오는 함수
  });
  const formattedMovieArray =
    data?.results.map((movie, index) => ({
      title: movie.title,
      release_date: movie.release_date,
      rank: index + 1, // 1씩 증가하는 rank
      id: movie.id,
      poster_path: movie.poster_path,
    })) ?? [];

  return { data: formattedMovieArray, isError, isLoading };
};
