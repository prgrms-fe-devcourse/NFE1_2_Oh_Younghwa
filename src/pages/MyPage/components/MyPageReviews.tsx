import ReviewContainer from '../../MovieDetailPage/components/ReviewContainer';
import { useGetReviews } from '../hooks/useGetReviews';

import '../../MovieDetailPage/scss/Review.scss';

type info = {
  username: string;
};

export default function MyPageReviews({ username }: info) {
  const { data, isLoading } = useGetReviews(username);

  if (isLoading) <div>로딩중</div>;

  return (
    <div className="review-wrapper">
      {data?.map(
        (review, index) =>
          review && (
            <ReviewContainer
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
          ),
      )}
    </div>
  );
}
