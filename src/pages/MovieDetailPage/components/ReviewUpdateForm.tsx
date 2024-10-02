import { ChangeEvent, useState } from 'react';

import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import LikedButtonIcon from '../../../shared/components/atom/icons/LikedButtonIcon';
import { useReviewMutation } from '../hook/useReviewMutation';

import StarRating from './StarRating';
type ReviewUpdateFormProps = {
  postId: string;
  channelId: string;
  rating: number;
  title: string;
  likes: number;
  author: string;
  createdAt: string;
  isLiked: string[];
  review: string;
  handleCancel: () => void;
  setIsEditing: (value: boolean) => void;
};
export default function ReviewUpdateForm({
  postId,
  channelId,
  rating,
  likes,
  title,
  author,
  createdAt,
  isLiked,
  review,
  handleCancel,
  setIsEditing,
}: ReviewUpdateFormProps) {
  const { updateReviewMutation } = useReviewMutation();

  //리뷰 수정 중일 때, 수정할 데이터를 담는 state입니다.
  const [formData, setFormData] = useState({ rating, review, title, author });
  //리뷰 수정 중, 별점을 변경할 때 실행되는 함수입니다.
  const ratingHandler = (rating: number) => {
    const newFormData = { ...formData, rating };
    setFormData(newFormData);
  };

  //리뷰 수정 중, 리뷰 내용을 변경할 때 실행되는 함수입니다.
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newFormData = { ...formData, review: value };
    setFormData(newFormData);
  };

  //리뷰 수정 중, 저장 버튼을 눌렀을 때 실행되는 함수입니다.
  const handleSave = () => {
    updateReviewMutation.mutate({ channelId, image: null, title: JSON.stringify(formData), postId });
    setIsEditing(false);
  };
  return (
    <div className="review-update-container">
      <div className="stars">
        <StarRating rating={formData.rating} setFormData={ratingHandler} />
      </div>
      <textarea defaultValue={review} onChange={onChangeHandler} className="review-text" />
      <div className="review-footer">
        <span className="reviewer">{author}</span>
        <span className="review-date">{createdAt}</span>
      </div>
      <div className="review-actions">
        <div className="likes">
          {isLiked.length !== 0 ? (
            <div className="likes-button">
              <LikedButtonIcon />
            </div>
          ) : (
            <div className="likes-button">
              <LikeButtonIcon />
            </div>
          )}
          <span className="like-count">{likes}</span>
        </div>
        <div className="buttons">
          <button className="cancel-button" onClick={handleCancel}>
            취소하기
          </button>
          <button className="edit-button" onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
