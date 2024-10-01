// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getPost } from '../api/PostDetail';

export const usePost = (postId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['post', postId], // 쿼리 키
    queryFn: () => getPost(postId), // 데이터를 가져오는 함수
  });
  return { data, isError, isLoading };
};
