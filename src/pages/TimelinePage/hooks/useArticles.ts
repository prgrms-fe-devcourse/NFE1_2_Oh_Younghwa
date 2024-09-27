// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getArticles } from '../api/TimelineApi';

export const useArticles = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['articles'], // 쿼리 키
    queryFn: getArticles, // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
