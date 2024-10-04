import { useState } from 'react';

import { User } from '../../TimelinePage/model/article';

import '../scss/myPage.scss';

interface MyPageHeaderProps {
  user: User;
}

const MyPageHeader = ({ user }: MyPageHeaderProps) => {
  return (
    <>
      <div className="mypage-header">
        <div className="user-profile">
          {user.image ? (
            <img className="user-profile-img-file" src={user.image} />
          ) : (
            <div className="user-profile-img-container"></div>
          )}
          <div className="user-profile-description">
            <p className="header-nickname">{user.fullName}</p>
            <h5 className="bio">{user.username}</h5>
            <div className="user-connection">
              <div className="follower">팔로워 {user?.followers.length}</div>
              <hr className="divider" />
              <div className="following">팔로잉 {user?.following.length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageHeader;
