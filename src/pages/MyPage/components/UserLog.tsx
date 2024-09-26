import '../scss/userLog.scss';

const UserLog: React.FC = () => {
  return (
    <div className="mypage-log">
      <ul className="user-log-list">
        <li className="article">게시글</li>
        <li className="review">영화리뷰</li>
        <li className="likes">좋아요</li>
      </ul>
    </div>
  );
};

export default UserLog;
