import { useState } from 'react';

import { useTokenValidation } from '../../../auth/hooks/useTokenValidation';
import { useSession } from '../../../context/SessionProvider';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import LikedButtonIcon from '../../../shared/components/atom/icons/LikedButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon';
import StarIcon from '../../../shared/components/atom/icons/StarIcon';
import { useLikesMutation } from '../hook/useLikesMutation';
import { useReviewMutation } from '../hook/useReviewMutation';

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
  const { deleteReviewMutation } = useReviewMutation();
  const { addLikesMutation, deleteLikesMutation } = useLikesMutation();
  const { data, isLoading } = useTokenValidation();

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
    console.log(isLiked, likesList);
    isLiked?.map((like) => {
      if (like) {
        console.log(like);
        deleteLikesMutation.mutate(like);
      }
    });
  };

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
              <button className="menu-item edit">수정</button>
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
