import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { followUser, getUser } from '../api/noticeApi';

type Author = {
  _id: string;
  fullName: string;
  image: string;
  followers: string[];
};

type Follow = {
  _id: string;
  user: string;
  follower: string;
};

interface NotificationFollowProps {
  notification: Follow;
  userId: string;
}

const NotificationFollow: React.FC<NotificationFollowProps> = ({ notification, userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Author>();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(notification.follower);
        setUser(userData);

        if (userData.followers.some((follower) => Object.values(follower).includes(userId))) {
          setIsFollowing(true); 
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUser();
  }, [isFollowing]);

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`); // 사용자 프로필로 이동
  };
  const handleFollowUser = async (userId: string) => {
    await followUser(userId); 
    console.log(`${userId}를 팔로우했습니다.`);
  };

  return (
    <div className="notifications-follow">
      {user ? (
        <>
          <img
            src={user.image}
            className="notifications-image"
            onClick={() => handleUserClick(user._id)}
          />
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
              if (!isFollowing) {
               
                handleFollowUser(user._id); // 팔로우 요청
                setIsFollowing(true)
              }
            }}
            disabled={isFollowing}
          >

            {isFollowing ? '팔로잉중' : '맞팔로우'}
          </button>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default NotificationFollow;
