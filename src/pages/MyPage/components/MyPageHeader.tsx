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
          <div className="user-profile-img-container">
            {/* <img className="user-profile-img-file" src={user.image}></img> */}
          </div>
          <div className="user-profile-description">
            <p className="nickname">{user.fullName}</p>
            <h5 className="bio">소개글</h5>
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
