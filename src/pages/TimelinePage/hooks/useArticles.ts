// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getAllPosts, getArticles } from '../api/TimelineApi';

export const useArticles = (channelId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['channel', channelId], // 쿼리 키
    queryFn: () => getArticles(channelId), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};

export const getAllChannel = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['channel'], // 쿼리 키
    queryFn: () => getAllPosts(), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
