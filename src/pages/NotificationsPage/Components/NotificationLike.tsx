import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import { getUser } from '../api/noticeApi';

type Author = {
  _id: string;
  fullName: string;
  image: string;
};
type Post = {
  _id: string;
  author: string;
  user: string;
  title: string;
};
type Like = {
  author: string;
  post: Post;
  user: string;
};

interface NotificationLikeProps {
  notification: Like;
}

const NotificationLike: React.FC<NotificationLikeProps> = ({ notification }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Author>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log(notification.post.author)
        // console.log(notification.user)
        const userData = await getUser(notification.user);
        setUser(userData);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUser();
  }, []);
  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="notifications-like-container">
      {user ? (
        <>
          <div className="notification-like">
            <LikeButtonIcon />
            <img src={user.image} className="notifications-image" />
            <span className="notifications-name" onClick={() => handleUserClick(user._id)}>
              {user.fullName}
            </span>
            <p className="notifications-text">님이 내 게시물을 마음에 들어합니다.</p>
          </div>
          <p className="notifications-post-title" onClick={() => handlePostClick(notification.post._id)}>
            {notification.post.title}
          </p>
          {/* {notification.postImage && (
            <img src={notification.postImage} alt="Post Image" className="notifications-post-image" />
          )} */}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default NotificationLike;
