import React from 'react';
import { useNavigate } from 'react-router-dom';

import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';

type Notification = {
  userId: string;
  id: number;
  name: string;
  follow: boolean;
  like: boolean;
  read: boolean;
  image: string;
  postId?: number;
  postTitle?: string;
  postImage?: string;
};

interface NotificationLikeProps {
  notification: Notification;
  handleMarkAsRead: (notificationId: number) => void;
}
const binaryToBase64 = (binaryData: string) => {
  return `data:image/png;base64,${btoa(binaryData)}`; //  이미지 형식 변경
};
const NotificationLike: React.FC<NotificationLikeProps> = ({ notification, handleMarkAsRead }) => {
  const navigate = useNavigate();
  const handlePostClick = () => {
    if (notification.postId) {
      navigate(`/posts/${notification.postId}`);
    }
  };
  const handleUserClick = () => {
    navigate(`/user/${notification.userId}`);
  };
  return (
    <div>
      {notification.like && (
        <div className="notifications-like-container" onClick={() => handleMarkAsRead(notification.id)}>
          <div className="notification-like">
            <LikeButtonIcon />
            <img src={binaryToBase64(notification.image)} className="notifications-image" />
            <span className="notifications-name" onClick={handleUserClick}>
              {notification.name}
            </span>
            <p className="notifications-text">님이 내 게시물을 마음에 들어합니다.</p>
          </div>
          <p className="notifications-post-title" onClick={handlePostClick}>
            {notification.postTitle}
          </p>
          {notification.postImage && (
            <img src={binaryToBase64(notification.postImage)} className="notifications-post-image" />
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationLike;
