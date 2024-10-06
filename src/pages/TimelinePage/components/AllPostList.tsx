import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon.tsx';
import UpdateModal from '../../WritePostPage/components/UpdateModal';
import WriteCommentModal from '../../WritePostPage/components/WriteComment.tsx';
import { getAllChannel } from '../hooks/useArticles.ts';
import { useLikesMutationInTimeLine } from '../hooks/useLikesMutationInTimeLine.ts';
import { usePostMutation } from '../hooks/usePostMutation';
import { Post } from '../model/article.ts';
import { elapsedText } from '../utility/elapsedText.ts';

import '../scss/timeline.scss';

const AllPostlist = () => {
  //주소창에 따른 채널아이디 받아오기
  const { channelId } = useParams() as { channelId: string };
  const { data = [], isError, isLoading } = getAllChannel();
  const flattenedArray = data?.flat().sort((a, b) => {
    const dateA = new Date(a.createdAt as string); // string으로 단언
    const dateB = new Date(b.createdAt as string); // string으로 단언
    return dateB.getTime() - dateA.getTime();
  });

  //좋아요, 좋아요 취소 로직을 담당하는 커스텀 훅
  const { addLikesMutation, deleteLikesMutation } = useLikesMutationInTimeLine();

  //수정삭제 옵션 온오프세팅
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //삭제mutation불러오기
  const { deletePostMutation } = usePostMutation();

  //모달온오프
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [CommentModalOpen, setCommentModalOpen] = useState(false);

  //postId props에 반영
  const [nowPostId, setNowPostId] = useState('');
  const [nowPostTitle, setNowPostTitle] = useState('');
  const [nowPostFullname, setNowPostFullname] = useState('');
  const [nowPostImg, setNowPostImg] = useState('');

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <div className="postlist-wrap">
        {flattenedArray.map((post: Post) => (
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
                    <button
                      className="likes-button"
                      onClick={() => addLikesMutation.mutate({ postId: post._id, authorId: post.author._id })}
                    >
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

export default AllPostlist;
