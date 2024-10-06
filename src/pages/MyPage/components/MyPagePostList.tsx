import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon.tsx';
import { useArticles } from '../../TimelinePage/hooks/useArticles.ts';
import { usePostMutation } from '../../TimelinePage/hooks/usePostMutation.ts';
import { Post } from '../../TimelinePage/model/article.ts';
import { elapsedText } from '../../TimelinePage/utility/elapsedText.ts';
import UpdateModal from '../../WritePostPage/components/UpdateModal.tsx';

import '../../TimelinePage/scss/timeline.scss';

interface info {
  posts: Post[];
  fullName?: string;
}

const MyPagePostList = ({ posts, fullName }: info) => {
  const { channelId } = useParams() as { channelId: string };

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
        {posts &&
          posts.map((post: Post) => (
            <div key={post?._id} className="post-wrap">
              <Link to={`/users/${post.author._id}`}>
                {post.author.image ? (
                  <img className="profile-img" src={post.author.image} alt={post.title} />
                ) : (
                  <PlaceholderIcon />
                )}
              </Link>
              <div className="post-box">
                <div className="post-info">
                  {fullName ? (
                    <p className="nickname">{fullName}</p>
                  ) : (
                    <p className="nickname">{post.author.fullName}</p>
                  )}
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

export default MyPagePostList;
