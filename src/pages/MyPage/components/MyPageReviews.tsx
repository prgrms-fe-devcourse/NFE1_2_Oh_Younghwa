import { useEffect, useState } from 'react';

import Review from '../../MovieDetailPage/components/Review';
import { MoviePost } from '../../TimelinePage/model/article';
import { getAllReviews } from '../api/userApi';

import '../../MovieDetailPage/scss/Review.scss';

type ReviewListProps = {
  title: string;
};
export default function ReviewList() {
  const [data, setData] = useState<MoviePost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllReviews('66f51699c7562307e3bd6223');
      setData(result);
      console.log('🚀 ~ ReviewList ~ data:', result);
    };

    fetchData();
  }, []);
  // const data = getAllReviews('66f51699c7562307e3bd6223');
  // console.log('🚀 ~ ReviewList ~ data:', data);
  // const sortedByLikesLength = data?.sort((a, b) => b.likes.length - a.likes.length);
  // console.log('🚀 ~ ReviewList ~ sortedByLikesLength:', sortedByLikesLength);

  return (
    <div className="review-wrapper">
      {/* {data?.map((review, index) => (
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
      ))} */}
    </div>
  );
}
