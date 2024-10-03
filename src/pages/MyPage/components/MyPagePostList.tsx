import { useState } from 'react';
import { Link } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import { Post } from '../../TimelinePage/model/article.ts';
import { elapsedText } from '../../TimelinePage/utility/elapsedText.ts';

import '../../TimelinePage/scss/timeline.scss';

const MyPagePostList = ({ posts }: { posts: Post[] }) => {
  const [isOn, setisOn] = useState(true);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);
  };

  console.log(posts);

  return (
    <div>
      <div className="postlist-wrap">
        {posts.map((post: Post) => (
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
                  {/* <div key={post._id} className={`option-box ${isOn ? '' : 'button-clicked'}`}>
                    <OptionPopup id={post._id} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPagePostList;
