import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';
import { useGetUsers } from './hooks/useGetUsers';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function OthersMyPage() {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mypage-container">
      {data && (
        <>
          <MyPageHeader user={data} />
          <UserLog user={data} />
          <button className="follow-btn">팔로우</button>
        </>
      )}
    </div>
  );
}
