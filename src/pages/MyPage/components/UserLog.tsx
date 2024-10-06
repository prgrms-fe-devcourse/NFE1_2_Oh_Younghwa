import { useState } from 'react';

import { useArticles } from '../../TimelinePage/hooks/useArticles';
import { Post, User } from '../../TimelinePage/model/article';

import MyPagePostList from './MyPagePostList';
import MyPageReviewCate from './MyPageReviewCate';

import '../scss/userLog.scss';

interface UserLogProps {
  user: User;
}

const UserLog = ({ user }: UserLogProps) => {
  const [log, setLog] = useState('articles'); //초기값은 'articles'
  //좋아요 누른 글 보기 위해 전체 타임라인에서 게시글 전부 불러오기
  const { data = [] }: { data: Post[] | undefined } = useArticles('66f50d3001d4aa076bcbdb99');

  //유저가 작성한 게시글 - 전체타임라인 채널에서 불러오기
  const postList = user.posts.filter((channels) => channels.channel === '66f50d3001d4aa076bcbdb99');
  //유저가 좋아요를 누른 게시글 - 전체타임라인에 있는 게시글에서 불러오기
  const likeList = data?.filter((post) => post.likes?.some((like) => like.user === user._id));

  //카테고리에 따라 다른 결과 보여주기
  const showLog = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const value = event.currentTarget;

    //모든 active 제거
    document.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active');
    });
    //선택된 요소에 active 추가
    value.classList.add('active');

    if (value.textContent === '게시글') {
      setLog('articles');
    }
    if (value.textContent === '영화리뷰') {
      setLog('reviews');
    }
    if (value.textContent === '좋아요') {
      setLog('likes');
    }
  };

  return (
    <div className="mypage-log">
      <ul className="user-log-list">
        <li className="article active" onClick={showLog}>
          게시글
        </li>
        <li className="review" onClick={showLog}>
          영화리뷰
        </li>
        <li className="likes" onClick={showLog}>
          좋아요
        </li>
      </ul>
      {/* 작성한 게시글 결과 */}
      {log === 'articles' &&
        (postList.length > 0 ? (
          <div>
            <MyPagePostList posts={postList} fullName={user.fullName} />
          </div>
        ) : (
          <p>작성한 게시글이 없습니다:&#41;</p>
        ))}

      {/* 영화리뷰 결과 */}
      {log === 'reviews' && (
        <div>
          <MyPageReviewCate fullName={user.fullName} />
        </div>
      )}

      {/* 좋아요 결과 */}
      {log === 'likes' &&
        (likeList.length > 0 ? (
          <div>
            <MyPagePostList posts={likeList} />
          </div>
        ) : (
          <p>조회된 게시글이 없습니다:&#41;</p>
        ))}
    </div>
  );
};

export default UserLog;
