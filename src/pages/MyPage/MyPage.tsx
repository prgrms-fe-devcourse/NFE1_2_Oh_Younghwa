import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function MyPage() {
  return (
    <div className="mypage-container">
      <MyPageHeader />
      <UserLog />
    </div>
  );
}
