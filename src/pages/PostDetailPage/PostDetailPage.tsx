import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentButtonIcon from '../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../shared/components/atom/icons/OptionButtonIcon.tsx';
import OptionPopup from '../TimelinePage/components/OptionPopup.tsx';

import PostComment from './components/PostComment.tsx';
import { usePost } from './hook/usePost.ts';
import { Post } from './model/article.ts';
import { elapsedText } from './utility/elapsedText.ts';

import './scss/postDetail.scss';

const PostDetailPage = () => {
  const [isOn, setisOn] = useState(true);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);
  };

  const { postId } = useParams() as { postId: string };
  const { data = {} as Post, isError, isLoading } = usePost(postId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  console.log(data._id);

  return (
    <div>
      <div key={data._id} className="post-wrap">
        <img className="profile-img" src={data.author.image} alt={data.title} />{' '}
        <div className="post-box">
          <div className="post-info">
            <p className="nickname">{data.author.fullName}</p>
            <p className="created">{elapsedText(new Date(data.createdAt))}</p>
          </div>
          <p className="post-contents">{data.title}</p>
          {data.image ? <img className="contents-image" src={data.image} alt={data.title} /> : null}
          <div className="activity-wrap">
            <div className="activity-side">
              <div className="activity">
                <LikeButtonIcon />
                {data.likes.length}
              </div>
              <div className="activity">
                <CommentButtonIcon />
                {data.comments.length}
              </div>
            </div>
            <div className="option-wrap" onClick={toggleHandler}>
              <OptionButtonIcon />
              {/* <div key={data._id} className={`option-box ${isOn ? "" : "button-clicked"}`}><OptionPopup/></div> */}
            </div>
          </div>
        </div>
      </div>
      <PostComment comments={data.comments} />
    </div>
  );
};
export default PostDetailPage;
