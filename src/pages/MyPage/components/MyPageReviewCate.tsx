import { useEffect, useState } from 'react';

import { useGetReviews } from '../hooks/useGetReviews';

import MyPageReviewContainer from './MyPageReviewContainer';

import '../../MovieDetailPage/scss/Review.scss';

type fullname = {
  fullName: string;
};

export default function MyPageReviewCate({ fullName }: fullname) {
  const { data, isLoading } = useGetReviews(fullName);
  const check = data?.map((data) => data?.author);
  console.log(check);

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="review-wrapper">
      {data?.map(
        (review, index) =>
          review && (
            <MyPageReviewContainer
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
