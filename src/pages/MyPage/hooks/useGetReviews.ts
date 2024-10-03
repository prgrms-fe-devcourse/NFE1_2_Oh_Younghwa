// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { getReviewsByUsername, Review } from '../api/userApi';

export const useGetReviews = (username: string) => {
  const { data, isError, isLoading } = useQuery<Review[]>({
    queryKey: ['movie_reviews', username], // 쿼리 키
    queryFn: () => getReviewsByUsername(username), // 데이터를 가져오는 함수
  });
  if (!data) return { data, isError, isLoading };
  const reviewData = data.map((data) => {
    try {
      const { rating, review, title, author } = JSON.parse(data.title);

      const isoDate = data.createdAt;
      const date = new Date(isoDate);

      // 'ko-KR' 로케일을 사용해 원하는 형식으로 변환
      const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      return {
        rating,
        review,
        title,
        author,
        createdAt: formattedDate,
        likes: data.likes,
        postId: data.postId,
        channelId: data.channelId,
        authorId: data.author,
      };
    } catch (err) {
      console.error('Failed to parse JSON:', err);
    }
  });

  return { data: reviewData, isError, isLoading };
};
