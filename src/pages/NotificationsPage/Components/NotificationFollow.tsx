import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { followUser, getUser } from '../api/noticeApi';

type Author = {
  _id: string;
  fullName: string;
  image: string;
};

type Follow = {
  follower: string;
  _id: string;
};
type Notification = {
  _id: string;
  follow: Follow;
  seen: boolean;
};
interface NotificationFollowProps {
  notification: Follow;
  handleMarkAsRead: (notificationId: string) => void;
}

const NotificationFollow: React.FC<NotificationFollowProps> = ({ notification, handleMarkAsRead }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Author>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(notification.follower); // 팔로우한
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`); // 사용자 프로필로 이동
  };
  const handleFollowUser = async (userId: string) => {
    await followUser(userId); // 사용자 팔로우 요청
    console.log(`${userId}를 팔로우했습니다.`);
  };
  console.log(notification._id);
  console.log(user);
  return (
    <div className="notifications-follow" onClick={() => user && handleMarkAsRead(notification._id)}>
      {user ? (
        <>
          <img src={user.image} className="notifications-image" alt={`${user.fullName}의 프로필 이미지`} />
          <div className="notifications-info">
            <span className="notifications-name" onClick={() => handleUserClick(user._id)}>
              {user.fullName}
            </span>
            <br />
            <p className="notifications-text">나를 팔로우함</p>
          </div>
          <button
            className="notifications-followBtn"
            onClick={(e) => {
              e.stopPropagation();
              handleFollowUser(user._id);
            }}
          >
            맞팔로우
          </button>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default NotificationFollow;
