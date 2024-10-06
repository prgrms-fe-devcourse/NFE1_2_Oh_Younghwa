import MyPageReview from './MyPageReview';

import '../../MovieDetailPage/scss/UpdateReview.scss';

type ReviewProps = {
  rating: number;
  review: string;
  author: string;
  title: string;
  createdAt: string;
};
export default function MyPageReviewContainer({ rating, review, author, title, createdAt }: ReviewProps) {
  const reviewProps = {
    rating,
    review,
    author,
    title,
    createdAt,
  };
  //평상시에 보이는 컴포넌트 입니다.
  return (
    <>
      <MyPageReview {...reviewProps} />
    </>
  );
}
