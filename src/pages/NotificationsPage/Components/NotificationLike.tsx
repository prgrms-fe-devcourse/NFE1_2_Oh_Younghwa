import React from 'react';
import { useNavigate } from 'react-router-dom';

import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';

type Author = {
  _id: string; // 작성자 ID
  fullName: string; // 작성자 이름
  image: string; // 작성자 이미지
};

// Like 타입 정의
type Like = {
  author: Author; // 좋아요 작성자 정보
  postId: string; // 좋아요가 적용된 포스트 ID
  postTitle: string; // 포스트 제목
  postImage: string; // 포스트 이미지
};

interface NotificationLikeProps {
  notification: Like;
  handleMarkAsRead: (notificationId: string) => void; // 알림 읽음 처리 핸들러
}

const binaryToBase64 = (binaryData: string) => {
  return `data:image/png;base64,${btoa(binaryData)}`; // 이미지 형식 변경
};

const NotificationLike: React.FC<NotificationLikeProps> = ({ notification, handleMarkAsRead }) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`); // 게시물 상세 페이지로 이동
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`); // 사용자 프로필 페이지로 이동
  };

  return (
    <div className="notifications-like-container" onClick={() => handleMarkAsRead(notification.author._id)}>
      <div className="notification-like">
        <LikeButtonIcon />
        <img src={binaryToBase64(notification.author.image)} className="notifications-image" />
        <span className="notifications-name" onClick={() => handleUserClick(notification.author._id)}>
          {notification.author.fullName}
        </span>
        <p className="notifications-text">님이 내 게시물을 마음에 들어합니다.</p>
      </div>
      <p className="notifications-post-title" onClick={() => handlePostClick(notification.postId)}>
        {notification.postTitle}
      </p>
      {notification.postImage && (
        <img src={binaryToBase64(notification.postImage)} alt="Post Image" className="notifications-post-image" />
      )}
    </div>
  );
};

export default NotificationLike;
