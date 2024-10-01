import React from 'react';
import { useNavigate } from 'react-router-dom';

import { followUser } from '../api/noticeApi';

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

interface NotificationFollowProps {
  notification: Notification;
  handleMarkAsRead: (notificationId: number) => void;
}
const binaryToBase64 = (binaryData: string) => {
  return `data:image/png;base64,${btoa(binaryData)}`; // 이미지 형식 변경
};
const NotificationFollow: React.FC<NotificationFollowProps> = ({ notification, handleMarkAsRead }) => {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(`/user/${notification.userId}`);
  };
  const handleFollowUser = async (userId: string) => {
    await followUser(userId);
    console.log(`${userId}를 팔로우했습니다.`);
  };
  return (
    <div>
      {notification.follow && (
        <div className="notifications-follow" onClick={() => handleMarkAsRead(notification.id)}>
          <img src={binaryToBase64(notification.image)} className="notifications-image" />
          <div className="notifications-info">
            <span className="notifications-name" onClick={handleUserClick}>
              {notification.name}
            </span>
            <br />
            <p className="notifications-text">나를 팔로우함</p>
          </div>
          <button
            className="notifications-followBtn"
            onClick={() => {
              handleFollowUser(notification.userId);
            }}
          >
            맞팔로우
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationFollow;
