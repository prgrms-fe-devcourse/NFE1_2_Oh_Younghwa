import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { followUser } from './api/userApi';
import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';
import { useGetOtherUsers } from './hooks/useGetOtherUsers';
import { useGetUsers } from './hooks/useGetUsers';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function OthersMyPage() {
  const token = localStorage.getItem('token') || '';

  const { userId } = useParams();
  const { data, isLoading, error } = useGetOtherUsers(userId as string); //다른 사용자의 정보
  const { data: myInfo } = useGetUsers(); //내 정보

  const navigate = useNavigate();

  useEffect(() => {
    //로그인 한 유저인지 확인
    if (token) {
      //접속한 상태에서 'user/접속한 나의 id' 입력하면 '/mypage'로 이동
      if (userId === myInfo?._id) {
        navigate('/mypage');
      }
    }
  }, [myInfo, data, navigate]);

  const followHandler = (userId: string, token: string) => {
    if (token && token !== '') {
      followUser(userId, token);
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mypage-container">
      {data && (
        <>
          <MyPageHeader user={data} />
          <UserLog user={data} />
          <button className="follow-btn" onClick={() => followHandler(data._id, token)}>
            팔로우
          </button>
        </>
      )}
    </div>
  );
}
