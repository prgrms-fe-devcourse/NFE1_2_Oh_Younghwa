import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTokenValidation } from '../../auth/hooks/useTokenValidation';
import ProfileSettingButtonIcon from '../../shared/components/atom/icons/ProfileSettingButtonIcon';

import EditModal from './components/EditModal';
import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function MyPage() {
  const { data, isLoading, error } = useTokenValidation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

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
          <button className="edit-btn" onClick={() => setModalOpen(true)}>
            <ProfileSettingButtonIcon />
          </button>

          {modalOpen && <EditModal isModalOpen={modalOpen} onClose={() => setModalOpen(false)} />}
        </>
      )}
    </div>
  );
}
