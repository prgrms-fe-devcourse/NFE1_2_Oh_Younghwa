import { useGetReviewsByMovieTitle } from '../hook/useGetReviewsByMovieTitle';

import Review from './Review';

import '../scss/Review.scss';
type ReviewListProps = {
  title: string;
};
export default function ReviewList({ title }: ReviewListProps) {
  const { data, isLoading } = useGetReviewsByMovieTitle({ title });
  console.log('🚀 ~ ReviewList ~ data:', data);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  // const sortedByLikesLength = data?.sort((a, b) => b.likes.length - a.likes.length);
  // console.log('🚀 ~ ReviewList ~ sortedByLikesLength:', sortedByLikesLength);

  return (
    <div className="review-wrapper">
      {data?.map((review, index) => (
        <Review
          key={index}
          rating={review.rating}
          review={review.review}
          author={review.author}
          authorId={review.authorId}
          channelId={review.channelId}
          postId={review.postId}
          title={review.title}
          createdAt={review.createdAt}
          likes={review.likes}
        />
      ))}
    </div>
  );
}
