import { ChangeEvent, FormEvent, useState } from 'react';

import { useSession } from '../../../context/SessionProvider';
import { LMS_REVIEW_CHANNEL } from '../../../shared/utils/baseUrl';
import { useReviewMutation } from '../hook/useReviewMutation';

import StarRating from './StarRating';
type ReviewFormProps = {
  title: string;
};
export default function ReviewForm({ title }: ReviewFormProps) {
  const session = useSession();
  const [formData, setFormData] = useState({ rating: 0, review: '', title, author: session?.fullName });

  const { addReviewMutation } = useReviewMutation();

  const ratingHandler = (rating: number) => {
    const newFormData = { ...formData, rating };
    setFormData(newFormData);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFormData = { ...formData, review: value };
    setFormData(newFormData);
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //초기 렌더링 시 author가 undefined라서, 리뷰를 제출할 때 author에 session?.fullName을 넣어줌
    formData.author = session?.fullName;
    addReviewMutation.mutate({ channelId: LMS_REVIEW_CHANNEL, image: null, title: JSON.stringify(formData) });
    const resetState = { rating: 0, review: '', title, author: '' };
    setFormData(resetState);
  };

  return (
    <div className="review-form-wrapper">
      <p className="review-form-header">감상평</p>
      <p className="review-form-star-header">별점을 선택해주세요</p>
      <StarRating rating={formData.rating} setFormData={ratingHandler} />
      <form className="review-form-input-wrapper" action="" onSubmit={onSubmitHandler}>
        <input type="text" className="review-form-input" value={formData.review} onChange={onChangeHandler} />
        <button className="review-form-button">등록</button>
      </form>
    </div>
  );
}
