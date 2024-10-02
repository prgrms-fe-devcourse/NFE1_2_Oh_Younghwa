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
  createdAt: string;
  isLiked: string[];
  postId: string;
  likes: number;
  isAuthor: boolean;
  toggleMenu: () => void;
  isOpen: boolean;
  handleEdit: () => void;
};
//isLiked.length,likes.length
export default function Review({
  rating,
  review,
  author,
  createdAt,
  isLiked,
  postId,
  likes,
  isAuthor,
  toggleMenu,
  isOpen,
  handleEdit,
}: ReviewProps) {
  //리뷰 삭제 로직을 담당하는 커스텀 훅입니다.
  const { deleteReviewMutation } = useReviewMutation();

  //좋아요, 좋아요 취소 로직을 담당하는 커스텀 훅입니다.
  const { addLikesMutation, deleteLikesMutation } = useLikesMutation();

  //리뷰 삭제
  const deleteReview = () => {
    deleteReviewMutation.mutate(postId);
  };

  //좋아요 요청 전송
  const postLike = () => {
    addLikesMutation.mutate(postId);
  };
  //좋아요 취소 요청 전송
  //이 버튼이 보인다는 것은 이미 좋아요를 눌렀다는 뜻입니다.
  const deleteLike = () => {
    deleteLikesMutation.mutate(isLiked[0]!);
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
          {/* 로그인한 사용자의 좋아요 리스트와 이 리뷰의 좋아요 리스트를 비교하여 중복된 요소가 있는지 확인합니다.
          중복된 요소가 있다면 좋아요를 누른 것입니다. 따라서 좋아요 취소 버튼이 보입니다. */}
          {isLiked.length !== 0 ? (
            <button className="likes-button" onClick={deleteLike}>
              <LikedButtonIcon />
            </button>
          ) : (
            <button className="likes-button" onClick={postLike}>
              <LikeButtonIcon />
            </button>
          )}
          <span className="like-count">{likes}</span>
        </div>
        <div className="hamburger-menu">
          {/* 리뷰 작성자만 보이는 버튼입니다. */}
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
