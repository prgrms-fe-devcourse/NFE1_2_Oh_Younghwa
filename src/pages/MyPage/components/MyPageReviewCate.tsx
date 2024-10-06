import { useGetReviews } from '../hooks/useGetReviews';

import MyPageReviewContainer from './MyPageReviewContainer';

import '../../MovieDetailPage/scss/Review.scss';

type fullname = {
  fullName: string;
};

export default function MyPageReviewCate({ fullName }: fullname) {
  const { data } = useGetReviews(fullName);

  return (
    <>
      <div className="review-wrapper">
        {data && data?.length > 0 ? (
          data?.map(
            (review, index) =>
              review && (
                <MyPageReviewContainer
                  key={index}
                  rating={review.rating}
                  review={review.review}
                  author={review.author}
                  title={review.title}
                  createdAt={review.createdAt}
                />
              ),
          )
        ) : (
          <p className="none">작성한 영화리뷰가 없습니다 :&#41;</p>
        )}
      </div>
    </>
  );
}
