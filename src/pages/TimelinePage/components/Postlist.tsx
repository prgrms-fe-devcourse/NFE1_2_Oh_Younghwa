import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon.tsx';
import UpdateModal from '../../WritePostPage/components/UpdateModal';
import { useArticles } from '../hooks/useArticles.ts';
import { usePostMutation } from '../hooks/usePostMutation';
import { Post } from '../model/article.ts';
import { elapsedText } from '../utility/elapsedText.ts';

import '../scss/timeline.scss';

const Postlist = () => {
  //주소창에 따른 채널아이디 받아오기
  const { channelId } = useParams() as { channelId: string };
  const { data = [], isError, isLoading } = useArticles(channelId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  //수정삭제 온오프세팅
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //삭제mutation불러오기
  const { deletePostMutation } = usePostMutation();

  //모달온오프
  const [modalOpen, setModalOpen] = useState(false);

  //postId 반영하기
  const [nowPostId, setNowPostId] = useState('');
  const [nowPostTitle, setNowPostTitle] = useState('');

  return (
    <div>
      <div className="postlist-wrap">
        {data?.map((post: Post) => (
          <div key={post?._id} className="post-wrap">
            {post.author.image ? (
              <img className="profile-img" src={post.author.image} alt={post.title} />
            ) : (
              <PlaceholderIcon />
            )}
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
                <div className="option-wrap" onClick={toggleMenu}>
                  <OptionButtonIcon />
                  {isOpen && (
                    <div className="menu-items">
                      <button
                        className="menu-item edit"
                        onClick={() => {
                          setModalOpen(true);
                          setNowPostId(post._id);
                          setNowPostTitle(post.title);
                          console.log(nowPostId, nowPostTitle, '체크');
                        }}
                      >
                        수정
                      </button>
                      <button className="menu-item delete" onClick={() => deletePostMutation.mutate(post._id)}>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <UpdateModal
          listPostId={nowPostId}
          listChannelId={channelId}
          listPostTitle={nowPostTitle}
          isModalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Postlist;
