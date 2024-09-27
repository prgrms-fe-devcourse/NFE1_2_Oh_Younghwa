import { useGetReviewsByMovieTitle } from '../hook/useGetReviewsByMovieTitle';
import '../scss/Review.scss';
import Review from './Review';
type ReviewListProps = {
  title: string;
};
export default function ReviewList({ title }: ReviewListProps) {
  const { data, isLoading } = useGetReviewsByMovieTitle({ title });
  console.log(data);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className="review-wrapper">
      <Review />
      <Review />
      <Review />
      <Review />
    </div>
  );
}
