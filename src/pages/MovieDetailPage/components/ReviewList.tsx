import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import StarIcon from '../../../shared/components/atom/icons/StarIcon';
import { useGetReviewsByMovieTitle } from '../hook/useGetReviewsByMovieTitle';

import '../scss/Review.scss';
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
    <div className="review-container">
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="review-text">
        긴장감이 계속되는 영화였다. 영화보는 동안 지루할 틈이 없어 시간이 진짜 빨리 간 것처럼 느껴짐. 내가 좋아하지 않는
        스릴러장르의 영화지만 재미있다고 느껴짐도
      </p>
      <div className="review-footer">
        <span className="reviewer">풀무원요거트</span>
        <span className="review-date">2024.09.11</span>
      </div>
      <div className="likes">
        <LikeButtonIcon />
        <span className="like-count">23</span>
      </div>
    </div>
  );
}
