import React, { useEffect, useState } from 'react';

import { followUser, getAllNotifications } from './api/noticeApi';
import NotificationFollow from './Components/NotificationFollow';
import NotificationLike from './Components/NotificationLike';

import './notifications.scss';

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

const example = [
  {
    id: 1,
    userId: 'user1',
    name: '최윤성',
    follow: true,
    like: false,
    read: false,
    image: '??',
  },
  {
    id: 2,
    userId: 'user2',
    name: '최운셩',
    follow: false,
    like: true,
    read: false,
    image: '???',
    postId: 101,
    postTitle: '예시',
    postImage: '???',
  },
  {
    id: 3,
    userId: 'user3',
    name: '최셩',
    follow: false,
    like: true,
    read: false,
    image: '???',
    postId: 102,
    postTitle: '예시2',
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      // const data = (await getAllNotifications()) as Notification[]; // 모든 알림 가져오기
      setNotifications(example); // data로 변경
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((noti) => {
        if (noti.id === notificationId) {
          return { ...noti, read: true };
        }
        return noti;
      }),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((noti) => ({ ...noti, read: true })));
  };

  if (loading) return <div>로딩 중...</div>;
  const sortedNotifications = [...notifications].sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));

  return (
    <div className="notifications-container">
      <div className="notifications-readAll">
        <button onClick={handleMarkAllAsRead} className="notifications-readBtn">
          전체확인
        </button>
      </div>
      <div className="notifications-contents">
        {sortedNotifications.map((notification) => (
          <div key={notification.id} className={`notifications-wrapper ${notification.read ? 'read' : 'unread'}`}>
            <NotificationFollow notification={notification} handleMarkAsRead={handleMarkAsRead} />
            <NotificationLike notification={notification} handleMarkAsRead={handleMarkAsRead} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
