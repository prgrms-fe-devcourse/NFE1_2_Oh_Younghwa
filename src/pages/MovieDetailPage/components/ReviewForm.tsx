import { ChangeEvent, FormEvent, useState } from 'react';

import { useSession } from '../../../context/SessionProvider';
import { LMS_REVIEW_CHANNEL } from '../../../shared/utils/baseUrl';
import { useReviewMutation } from '../hook/useReviewMutation';

import StarRating from './StarRating';
import { toaster } from '../../../shared/components/toaster/CustomToast';
type ReviewFormProps = {
  title: string;
};
export default function ReviewForm({ title }: ReviewFormProps) {
  const session = useSession();
  const [formData, setFormData] = useState({ rating: 0, review: '', title, author: session?.fullName });

  const [hover, setHover] = useState(0);
  const { addReviewMutation } = useReviewMutation();

  const ratingHandler = (rating: number) => {
    const newFormData = { ...formData, rating };
    setFormData(newFormData);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newFormData = { ...formData, review: value };
    setFormData(newFormData);
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.review === '') {
      toaster.warn({ text: '리뷰를 입력해주세요' });
      return;
    }
    if (formData.rating === 0) {
      toaster.warn({ text: '평점을 입력해주세요' });
      return;
    }
    //초기 렌더링 시 author가 undefined라서, 리뷰를 제출할 때 author에 session?.fullName을 넣어줌
    formData.author = session?.fullName;
    addReviewMutation.mutate({ channelId: LMS_REVIEW_CHANNEL, image: null, title: JSON.stringify(formData) });
    const resetState = { rating: 0, review: '', title, author: '' };
    setFormData(resetState);
    setHover(0);
  };

  return (
    <div className="review-form-wrapper">
      <p className="review-form-header">평가하기</p>
      <StarRating hover={hover} setHover={setHover} rating={formData.rating} setFormData={ratingHandler} />
      <form className="review-form-input-wrapper" action="" onSubmit={onSubmitHandler}>
        <textarea
          className="review-form-input"
          placeholder="감상평을 작성해주세요"
          value={formData.review}
          onChange={onChangeHandler}
        />
        <button className="review-form-button">등록</button>
      </form>
    </div>
  );
}
