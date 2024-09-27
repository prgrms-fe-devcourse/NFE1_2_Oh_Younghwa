import { ChangeEvent, FormEvent, useState } from 'react';

import { LMS_REVIEW_CHANNEL } from '../../../shared/utils/baseUrl';
import { useReviewMutation } from '../hook/useReviewMutation';

import StarRating from './StarRating';
type ReviewFormProps = {
  title: string;
};
export default function ReviewForm({ title }: ReviewFormProps) {
  const [formData, setFormData] = useState({ rating: 0, review: '', title });
  const { mutation } = useReviewMutation();
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
    mutation.mutate({ channelId: LMS_REVIEW_CHANNEL, image: '', title: JSON.stringify(formData) });
    const resetState = { rating: 0, review: '', title };
    setFormData(resetState);
  };
  console.log(formData.rating);
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
