import { useState } from 'react';

import ProfileSettingButtonIcon from '../../../shared/components/atom/icons/ProfileSettingButtonIcon';

import '../scss/myPage.scss';

const MyPageHeader: React.FC = () => {
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  return (
    <>
      <div className="mypage-header">
        <div className="user-profile">
          <div className="user-profile-img">프로필사진</div>
          <div className="user-profile-description">
            <p className="nickname">닉네임</p>
            <h5 className="bio">소개글</h5>
          </div>
        </div>
        <div className="user-connection">
          <div className="follower">팔로워 {follower}</div>
          <hr className="divider" />
          <div className="following">팔로잉 {following}</div>
        </div>
        <div className="edit-btn">
          <ProfileSettingButtonIcon />
        </div>
        <button className="follow-btn">팔로잉</button>
      </div>
    </>
  );
};

export default MyPageHeader;
