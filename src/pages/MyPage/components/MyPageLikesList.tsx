import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon.tsx';
import { useLikesMutation } from '../../MovieDetailPage/hook/useLikesMutation.ts';
import { usePostMutation } from '../../TimelinePage/hooks/usePostMutation.ts';
import { Post, User } from '../../TimelinePage/model/article.ts';
import { elapsedText } from '../../TimelinePage/utility/elapsedText.ts';
import UpdateModal from '../../WritePostPage/components/UpdateModal.tsx';
import WriteCommentModal from '../../WritePostPage/components/WriteComment.tsx';

import '../../TimelinePage/scss/timeline.scss';

interface info {
  posts: Post[];
  user?: User;
}

const MyPageLikesList = ({ posts, user }: info) => {
  //좋아요, 좋아요 취소 로직을 담당하는 커스텀 훅
  const { addLikesMutation, deleteLikesMutation } = useLikesMutation();
  const { channelId } = useParams() as { channelId: string };
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //삭제mutation불러오기
  const { deletePostMutation } = usePostMutation();

  //모달온오프
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [CommentModalOpen, setCommentModalOpen] = useState(false);

  //postId 반영하기
  const [nowPostId, setNowPostId] = useState('');
  const [nowPostTitle, setNowPostTitle] = useState('');
  const [nowPostFullname, setNowPostFullname] = useState('');
  const [nowPostImg, setNowPostImg] = useState('');

  const moveToPage = (postUser: string) => {
    // console.log(user?.fullName, postUser.fullName, userId, postUser._id);
    console.log(user?._id, postUser);
    if (user?._id !== postUser) {
      navigate(`/users/${postUser}`);
    } else {
      navigate(`/users/mypage`);
    }
  };

  console.log(posts.map((post) => post.author));

  return (
    <div>
      <div className="postlist-wrap">
        {posts &&
          posts.map((post: Post) => (
            <div key={post?._id} className="post-wrap">
              <div className="img-box">
                {post.author.image ? (
                  <img
                    className="profile-img"
                    src={post.author.image}
                    alt={post.title}
                    onClick={() => moveToPage(post.author._id)}
                  />
                ) : (
                  <div onClick={() => moveToPage(post.author._id)}>
                    <PlaceholderIcon />
                  </div>
                )}
              </div>
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
                      <button className="likes-button" onClick={() => addLikesMutation.mutate(post._id)}>
                        <LikeButtonIcon />
                      </button>
                      {post.likes.length}
                    </div>
                    <div className="activity">
                      <button
                        className="likes-button"
                        onClick={() => {
                          setCommentModalOpen(true);
                          setNowPostId(post._id);
                          setNowPostFullname(post.author.fullName);
                          setNowPostImg(post.author.image);
                          setNowPostTitle(post.title);
                        }}
                      >
                        <CommentButtonIcon />
                      </button>
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
                            setUpdateModalOpen(true);
                            setNowPostId(post._id);
                            setNowPostTitle(post.title);
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

      {UpdateModalOpen && (
        <UpdateModal
          listPostId={nowPostId}
          listChannelId={channelId}
          listPostTitle={nowPostTitle}
          isUpdateModalOpen={UpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}

      {CommentModalOpen && (
        <WriteCommentModal
          listPostId={nowPostId}
          listChannelId={channelId}
          listFullname={nowPostFullname}
          listPostTitle={nowPostTitle}
          isCommentModalOpen={CommentModalOpen}
          listPostImg={nowPostImg}
          onClose={() => setCommentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPageLikesList;
