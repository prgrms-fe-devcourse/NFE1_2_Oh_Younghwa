import React, { useEffect, useState } from 'react';
import { getAllNotifications } from './api/noticeApi'; // API 함수 import

// Notification 타입 정의
type Notification = {
  name: string; // 사용자 이름
  follow: boolean; // 팔로우 여부
  like: boolean; // 좋아요 여부
  read : boolean
};

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 예시 데이터
  const example = [
    {
      name: '최윤성',
      follow: true,
      like: false,
      read : false
    },
    {
      name: '최운셩',
      follow: true,
      like: true,
      read : false
    },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllNotifications() as Notification[];; // 모든 알림 가져오기
        setNotifications(data);
        setLoading(false);
      } catch (e) {
        setError('알림을 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 상태
  if (error) return <div>{error}</div>; // 오류 상태

  const notificationMessages =
    example.length === 0 ? (
      <p>새로운 알림이 없습니다.</p> // 알림이 없을 경우
    ) : (
      example.map((notification, index) => (
        <div key={index}>
          {notification.follow && <p>{notification.name}님이 나를 팔로우했습니다.</p>}
          {notification.like && <p>{notification.name}님이 내 게시물을 마음에 들어합니다.</p>}
         
        </div>
        
      ))
    );
  
  return (
    <div>
      {notificationMessages}
    </div>
  );
};

export default NotificationsPage;
