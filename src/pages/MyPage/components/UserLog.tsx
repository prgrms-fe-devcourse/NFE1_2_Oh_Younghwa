import { useEffect, useState } from 'react';

import { User } from '../../TimelinePage/model/article';

import '../scss/userLog.scss';

interface UserLogProps {
  user: User;
}

const UserLog = ({ user }: UserLogProps) => {
  const [log, setLog] = useState<string[]>([]);

  const showLog = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const value = event.currentTarget.textContent;
    //const posts: string[] = user.posts;
    if (value === '게시글') {
      setLog(user.posts.map((post) => post.title));
    }
    if (value === '영화리뷰') {
      setLog(user.posts.map((post) => post.image));
    }
    if (value === '좋아요') {
      setLog(user.likes.map((like) => like.post));
    }
  };

  return (
    <div className="mypage-log">
      <ul className="user-log-list">
        <li className="article" onClick={showLog}>
          게시글
        </li>
        <li className="review" onClick={showLog}>
          영화리뷰
        </li>
        <li className="likes" onClick={showLog}>
          좋아요
        </li>
      </ul>
      <div className="show-log">{log}</div>
    </div>
  );
};

export default UserLog;
