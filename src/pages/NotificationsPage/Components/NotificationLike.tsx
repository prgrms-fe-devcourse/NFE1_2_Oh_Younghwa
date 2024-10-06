import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
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
  image: string;

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
        const userData = await getUser(notification.user);
        setUser(userData);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="notifications-like-container">
      {user ? (
        <>
          <div className="notification-like">
            <LikeButtonIcon />
            <Link to={`/users/${user._id}`}>
              {user.image ? <img className="profile-img" src={user.image} /> : <PlaceholderIcon />}
            </Link>

            <span className="notifications-name">
              <Link to={`/users/${user._id}`}>{user.fullName}</Link>
            </span>

            <p className="notifications-text">님이 내 게시물을 마음에 들어합니다.</p>
          </div>

          <p className="notifications-post-title">
            <Link to={`/posts/${notification.post._id}`}>{notification.post.title}</Link>
          </p>
          <Link to={`/posts/${notification.post._id}`}>
            {notification.post.image && (
              <img src={notification.post.image} alt="Post Image" className="notifications-post-image" />
            )}
          </Link>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default NotificationLike;
