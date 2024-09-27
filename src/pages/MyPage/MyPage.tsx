import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTokenValidation } from '../../auth/hooks/useTokenValidation';
import ProfileSettingButtonIcon from '../../shared/components/atom/icons/ProfileSettingButtonIcon';

import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function MyPage() {
  const { data, isLoading, error } = useTokenValidation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/login');
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mypage-container">
      {data && (
        <>
          <MyPageHeader user={data} />
          <UserLog user={data} />
          <div className="edit-btn">
            <ProfileSettingButtonIcon />
          </div>
        </>
      )}
    </div>
  );
}
