import { ChangeEvent, FormEvent, useState } from 'react';

import { useTokenValidation } from '../../../auth/hooks/useTokenValidation';
import { useSession } from '../../../context/SessionProvider';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import LikedButtonIcon from '../../../shared/components/atom/icons/LikedButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon';
import StarIcon from '../../../shared/components/atom/icons/StarIcon';
import { useLikesMutation } from '../hook/useLikesMutation';
import { useReviewMutation } from '../hook/useReviewMutation';

import StarRating from './StarRating';

import '../scss/UpdateReview.scss';
type ReviewProps = {
  rating: number;
  review: string;
  author: string;
  authorId: string;
  channelId: string;
  postId: string;
  title: string;
  createdAt: string;
  likes: string[];
};
export default function Review({
  rating,
  review,
  author,
  authorId,
  channelId,
  postId,
  title,
  createdAt,
  likes,
}: ReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteReviewMutation, updateReviewMutation } = useReviewMutation();
  const { addLikesMutation, deleteLikesMutation } = useLikesMutation();
  const { data, isLoading } = useTokenValidation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(review);
  const [editedRating, setEditedRating] = useState(rating);

  const session = useSession(); //이거 받아오고 []렌더링 한 번 더 됨. invalidate queries 하고 나서 다시 받아오게 할 수 있을까?

  const deleteReview = () => {
    deleteReviewMutation.mutate(postId);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const postLike = () => {
    addLikesMutation.mutate(postId);
  };

  const isAuthor = session?.fullName === author;

  const likesList = data?.likes?.map((like) => like._id);
  function findString<T>(array: T[] = [], target: T) {
    const found = array.find((item) => item === target);
    return found ? found : null;
  }

  const isLiked = likes.map((like) => findString(likesList, like));

  const deleteLike = () => {
    isLiked?.map((like) => {
      if (like) {
        deleteLikesMutation.mutate(like);
      }
    });
    setIsEditing(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedReview(review);
    setEditedRating(rating);
    setIsEditing(false);
  };

  //업데이트 로직

  const [formData, setFormData] = useState({ rating, review, title, author });
  const ratingHandler = (rating: number) => {
    const newFormData = { ...formData, rating };
    setFormData(newFormData);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newFormData = { ...formData, review: value };
    setFormData(newFormData);
  };
  const handleSave = () => {
    updateReviewMutation.mutate({ channelId, image: null, title: JSON.stringify(formData), postId });
    setIsEditing(false);
  };
  // const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   //초기 렌더링 시 author가 undefined라서, 리뷰를 제출할 때 author에 session?.fullName을 넣어줌

  // };
  if (isEditing) {
    return (
      <div className="review-update-container">
        <div className="stars">
          <StarRating rating={formData.rating} setFormData={ratingHandler} />
        </div>

        <textarea defaultValue={editedReview} onChange={onChangeHandler} className="review-text" />

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
            <span className="like-count">{likes.length}</span>
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
  return (
    <div className="review-container">
      <div className="stars">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="review-text">{review}</p>
      <div className="review-footer">
        <span className="reviewer">{author}</span>
        <span className="review-date">{createdAt}</span>
      </div>
      <div className="likes-hamburger-wrapper">
        <div className="likes">
          {isLiked.length !== 0 ? (
            <button className="likes-button" onClick={deleteLike}>
              <LikedButtonIcon />
            </button>
          ) : (
            <button className="likes-button" onClick={postLike}>
              <LikeButtonIcon />
            </button>
          )}
          <span className="like-count">{likes.length}</span>
        </div>
        <div className="hamburger-menu">
          {isAuthor ? (
            <button className="hamburger-icon" onClick={toggleMenu}>
              <OptionButtonIcon />
            </button>
          ) : null}
          {isOpen && (
            <div className="menu-items">
              <button className="menu-item edit" onClick={handleEdit}>
                수정
              </button>
              <button className="menu-item delete" onClick={deleteReview}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
