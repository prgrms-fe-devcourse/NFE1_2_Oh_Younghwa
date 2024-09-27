// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';
import { getReviewsByMovieTitle } from '../api/reviewApi';

type MovieTitle = {
  title: string;
};
export const useGetReviewsByMovieTitle = ({ title }: MovieTitle) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['movie_reviews', title], // 쿼리 키
    queryFn: () => getReviewsByMovieTitle(title), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
