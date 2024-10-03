import React, { useEffect, useState } from 'react';
import { getAllNotifications, putNotificationSeen } from './api/noticeApi';
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

type Like = {
  author: Author; // 좋아요 작성자 정보
  postId: string; // 좋아요가 적용된 포스트 ID
  postTitle: string; // 포스트 제목
  postImage: string; // 포스트 이미지
};

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

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await putNotificationSeen(notificationId); // API 호출하여 알림을 읽음으로 표시
      setNotifications((prev) => {
        return prev.map((noti) => {
          if (noti._id === notificationId) {
            console.log(`알림 ID: ${noti._id}, seen 상태: true`); // 읽음 상태 변경 로그
            return { ...noti, seen: true };
          }
          return noti;
        });
      });
    } catch (error) {
      console.error('알림 읽음 상태로 변경 실패:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(notifications.map((noti) => putNotificationSeen(noti._id)));
      setNotifications((prev) => prev.map((noti) => ({ ...noti, seen: true })));
    } catch (error) {
      console.error('모든 알림 읽음 상태로 변경 실패:', error);
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    handleMarkAsRead(notificationId); // 클릭 시 알림을 읽음으로 처리
  };

  if (loading) return <div>로딩 중...</div>;
console.log(notifications)
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
          <div
            key={notification._id}
            className={`notifications-wrapper ${notification.seen ? 'read' : 'unread'}`}
            onClick={() => handleNotificationClick(notification._id)} 
          >
            {/* 팔로우 알림이 있는 경우 */}
            {notification.follow && (
              <NotificationFollow notification={notification.follow} />
            )}
            {/* 좋아요 알림이 있는 경우 */}
            {notification.like && (
              <NotificationLike notification={notification.like} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
