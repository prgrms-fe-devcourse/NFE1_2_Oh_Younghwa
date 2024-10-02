import React, { useEffect, useState } from 'react';

import { getAllNotifications } from './api/noticeApi';
import NotificationFollow from './Components/NotificationFollow';
import NotificationLike from './Components/NotificationLike';

import './notifications.scss';

type Author = {
  _id: string; // 작성자 ID
  fullName: string; // 작성자 이름
  image: string; // 작성자 이미지
};

type Follow = {
  _id: string; // 알림 ID
  user: string; // 사용자 ID
  follower: string; // 팔로워 ID
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
};

// Like 타입 정의
type Like = {
  author: Author; // 좋아요 작성자 정보
  postId: string; // 좋아요가 적용된 포스트 ID
  postTitle: string; // 포스트 제목
  postImage: string; // 포스트 이미지
};

// Notification 타입 정의
type Notification = {
  _id: string; // 알림 ID 추가
  follow?: Follow; // 팔로우 알림 (optional)
  like?: Like; // 좋아요 알림 (optional)
  seen: boolean; // 읽음 여부
};

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 오류 발생:', error);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((noti) => (noti._id === notificationId ? { ...noti, seen: true } : noti)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((noti) => ({ ...noti, seen: true })));
  };

  if (loading) return <div>로딩 중...</div>;

  // 알림을 읽음 여부에 따라 정렬
  const sortedNotifications = [...notifications].sort((a, b) => (a.seen === b.seen ? 0 : a.seen ? 1 : -1));

  return (
    <div className="notifications-container">
      <div className="notifications-readAll">
        <button onClick={handleMarkAllAsRead} className="notifications-readBtn">
          전체확인
        </button>
      </div>
      <div className="notifications-contents">
        {sortedNotifications.map((notification) => (
          <div key={notification._id} className={`notifications-wrapper ${notification.seen ? 'read' : 'unread'}`}>
            {/* 팔로우 알림이 있는 경우 */}
            {notification.follow && (
              <NotificationFollow notification={notification.follow} handleMarkAsRead={handleMarkAsRead} />
            )}
            {/* 좋아요 알림이 있는 경우 */}
            {notification.like && (
              <NotificationLike notification={notification.like} handleMarkAsRead={handleMarkAsRead} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
