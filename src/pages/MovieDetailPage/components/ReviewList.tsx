import { useGetReviewsByMovieTitle } from '../hook/useGetReviewsByMovieTitle';

import ReviewContainer from './ReviewContainer';

import '../scss/Review.scss';
import { useState } from 'react';
type ReviewListProps = {
  title: string;
};
export default function ReviewList({ title }: ReviewListProps) {
  const { data, isLoading } = useGetReviewsByMovieTitle({ title });
  const [sortType, setSortType] = useState<'like' | 'date'>('date'); // 정렬 상태 관리

  // 정렬 함수
  const sortedData = data?.slice().sort((a, b) => {
    if (sortType === 'like') {
      return b.likes.length - a.likes.length; // 좋아요 순
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신 순
    }
  });
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  //sort로 정렬을 하고나서 리렌더링을 하기위해선 state를 사용해야함.
  //데이터를 가져온 다음, state에 저장하고, state의 복사본을 만들어서 정렬로 새로운 데이터를 만들고, setState를 통해 리렌더링을 하려했음.
  //그런데 가져온 데이터를 state에 저장한다는게 좋아보이지가 않았음. 메모리도 많이 먹을 것 같고?
  //gpt에게 물어보니, 정렬 타입을 state로 하고, 그 state를 바꿔서 리렌더링과 동시에 정렬을 하는 방법을 알려줌.
  //이러면 state에는 단순한 문자열만 저장하고, 코드도 직관적이다. 아까 코드는 상상만 해도 더러워

  return (
    <div className="review-wrapper">
      <div className="sort-button-wrapper">
        <button
          className={sortType === 'like' ? 'selected-button' : 'not-selected-button'}
          onClick={() => setSortType('like')}
        >
          좋아요 순
        </button>
        <button
          className={sortType === 'date' ? 'selected-button' : 'not-selected-button'}
          onClick={() => setSortType('date')}
        >
          최신 순
        </button>
      </div>
      {sortedData?.map((review, index) => (
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
      ))}
    </div>
  );
}
