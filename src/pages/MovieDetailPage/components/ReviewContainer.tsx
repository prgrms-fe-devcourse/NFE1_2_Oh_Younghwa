import { useState } from 'react';

import { useTokenValidation } from '../../../auth/hooks/useTokenValidation';
import { findString } from '../utils/findString';

import Review from './Review';
import ReviewUpdateForm from './ReviewUpdateForm';

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
export default function ReviewContainer({
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
  //햄버거 버튼을 열고 닫는 state입니다
  const [isOpen, setIsOpen] = useState(false);

  //리뷰 수정 중인지 확인하는 state입니다. 수정 폼을 보일지 리뷰를 보일 지 결정합니다.
  const [isEditing, setIsEditing] = useState(false);

  //로그인 한 유저의 정보를 가져옵니다
  const { data } = useTokenValidation();

  //현재 로그인한 사용자의 좋아요 리스트에서 _id만 추려서 배열로 만듭니다.
  const likesList = data?.likes?.map((like) => like._id);

  //이 리뷰의 주인이 현재 로그인한 사용자인지 확인합니다. 참이면 햄버거 버튼이 보입니다.
  const isAuthor = data?.fullName === author;

  //이 리뷰의 좋아요 id가 현재 로그인한 사용자의 좋아요 리스트에 있는지 확인합니다.
  //있다면 길이가 1인 배열이 반환됩니다.
  const isLiked = likes.map((like) => findString(likesList, like));

  //리뷰 업데이트 로직=
  //햄버거 버튼을 열고 닫는 함수입니다.
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //수정 버튼을 눌렀을 때 실행되는 함수입니다.
  //수정 폼을 보여주고, 햄버거 버튼을 닫습니다
  const handleEdit = () => {
    setIsEditing(true);
    setIsOpen(false);
  };

  //수정 취소 버튼을 눌렀을 때 실행되는 함수입니다.
  //수정 폼을 닫고, 햄버거 버튼을 닫습니다.
  const handleCancel = () => {
    setIsEditing(false);
    setIsOpen(false);
  };

  //리뷰 수정 중일 때 보이는 컴포넌트에 전달할 props입니다.
  //jsx에서 작성하면 가독성이 떨어지기 때문에 따로 분리했습니다.
  const reviewUpdateProps = {
    postId,
    channelId,
    rating,
    title,
    likes: likes.length,
    author,
    createdAt,
    isLiked: isLiked as string[],
    review,
    handleCancel,
    setIsEditing,
  };
  const reviewProps = {
    rating,
    review,
    author,
    createdAt,
    isLiked: isLiked as string[],
    postId,
    likes: likes.length,
    isAuthor,
    toggleMenu,
    isOpen,
    handleEdit,
  };

  //평상시에 보이는 컴포넌트 입니다.
  return <>{isEditing ? <ReviewUpdateForm {...reviewUpdateProps} /> : <Review {...reviewProps} />}</>;
}
