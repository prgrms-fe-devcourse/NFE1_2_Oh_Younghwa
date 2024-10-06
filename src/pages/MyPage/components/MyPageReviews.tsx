import Review from '../../MovieDetailPage/components/Review';
import { MoviePost, Post } from '../../TimelinePage/model/article';
import { getAllReviews } from '../api/userApi';

import '../../MovieDetailPage/scss/Review.scss';

export default function MyPageReviews() {
  return (
    <div className="review-wrapper">
      {/* {reivewList?.map((review, index) => (
        <Review
          key={index}
          rating={review.rating}
          review={review.review}
          author={userId}
          authorId={review.authorId}
          channelId={review.channelId}
          postId={review.postId}
          title={review.title}
          createdAt={review.createdAt}
          likes={review.likes}
        />
      ))} */}
    </div>
  );
}
