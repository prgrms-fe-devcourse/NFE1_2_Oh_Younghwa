import { useState } from 'react';

import { useTokenValidation } from '../../../auth/hooks/useTokenValidation';
import { findString } from '../../MovieDetailPage/utils/findString';

import MyPageReview from './MyPageReview';

import '../../MovieDetailPage/scss/UpdateReview.scss';

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
export default function MyPageReviewContainer({
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
  //로그인 한 유저의 정보를 가져옵니다
  const { data } = useTokenValidation();
  //현재 로그인한 사용자의 좋아요 리스트에서 _id만 추려서 배열로 만듭니다.
  const likesList = data?.likes?.map((like) => like._id);
  //이 리뷰의 좋아요 id가 현재 로그인한 사용자의 좋아요 리스트에 있는지 확인합니다.
  //있다면 길이가 1인 배열이 반환됩니다.
  const isLiked = likes.map((like) => findString(likesList, like));
  const reviewProps = {
    rating,
    review,
    author,
    authorId,
    title,
    createdAt,
    isLiked: isLiked as string[],
    postId,
    likes: likes.length,
  };
  //평상시에 보이는 컴포넌트 입니다.
  return (
    <>
      <MyPageReview {...reviewProps} />
    </>
  );
}
