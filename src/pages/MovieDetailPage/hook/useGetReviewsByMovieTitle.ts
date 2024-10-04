// src/hooks/usePopularMovies.ts
import { useQuery } from '@tanstack/react-query';

import { MoviePost } from '../../TimelinePage/model/article';
import { getReviewsByMovieTitle } from '../api/reviewApi';

type MovieTitle = {
  title: string;
};
export const useGetReviewsByMovieTitle = ({ title }: MovieTitle) => {
  const { data, isError, isLoading } = useQuery<MoviePost[]>({
    queryKey: ['movie_reviews', title], // 쿼리 키
    queryFn: () => getReviewsByMovieTitle(title), // 데이터를 가져오는 함수
  });
  if (!data) return { data, isError, isLoading };
  console.log('🚀 ~ useGetReviewsByMovieTitle ~ data:', data);
  const reviewData = data.map((data) => {
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
      postId: data._id,
      channelId: data.channel,
      authorId: data.author,
    };
  });

  return { data: reviewData, isError, isLoading };
};
