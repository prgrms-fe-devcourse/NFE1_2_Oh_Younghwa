import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import { useArticles } from '../hooks/useArticles.ts';
import { Post } from '../model/article.ts';
import { elapsedText } from '../utility/elapsedText.ts';

import OptionPopup from './OptionPopup.tsx';

import '../scss/timeline.scss';

const Postlist = () => {
  const [isOn, setisOn] = useState(true);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);
  };
  const { channelId } = useParams() as { channelId: string };
  const { data = [], isError, isLoading } = useArticles(channelId);
  console.log(data);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <div className="postlist-wrap">
        {data.map((post: Post) => (
          <div key={post._id} className="post-wrap">
            <img className="profile-img" src={post.author.image} alt={post.title} />{' '}
            <div className="post-box">
              <div className="post-info">
                <p className="nickname">{post.author.fullName}</p>
                <p className="created">{elapsedText(new Date(post.createdAt))}</p>
              </div>
              <Link to={`/posts/${post._id}`}>
                <p className="post-contents">{post.title}</p>
                {post.image ? <img className="contents-image" src={post.image} alt={post.title} /> : null}
              </Link>
              <div className="activity-wrap">
                <div className="activity-side">
                  <div className="activity">
                    <LikeButtonIcon />
                    {post.likes.length}
                  </div>
                  <div className="activity">
                    <CommentButtonIcon />
                    {post.comments.length}
                  </div>
                </div>
                <div className="option-wrap" onClick={toggleHandler}>
                  <OptionButtonIcon />
                  <div key={post._id} className={`option-box ${isOn ? '' : 'button-clicked'}`}>
                    <OptionPopup id={post._id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postlist;
