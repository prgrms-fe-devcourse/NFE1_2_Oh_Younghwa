import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import ModalCloseIcon from '../../../shared/components/atom/icons/ModalCloseIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
import { useGetUsers } from '../../MyPage/hooks/useGetUsers';
import { usePostMutation } from '../../TimelinePage/hooks/usePostMutation';

import '../scss/writeCommentModal.scss';

interface EditModalProps {
  listPostId: string;
  listChannelId: string;
  listFullname: string;
  listPostTitle: string;
  listPostImg: string;
  isCommentModalOpen: boolean;
  onClose: () => void;
}

const WriteCommentModal = ({
  listPostId,
  listPostImg,
  listFullname,
  listPostTitle,
  isCommentModalOpen,
  onClose,
}: EditModalProps) => {
  //모달 온오프
  if (!isCommentModalOpen) return null;

  const { data, isLoading, error } = useGetUsers();

  //formdata에 따라서 textarea길이변경하기
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; // 초기화
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`; // 높이 조절
    }
  }, [text]); // text가 변경될 때마다 호출

  //form data 전달해서 업데이트 요청보내기
  const [formData, setFormData] = useState('');
  const { addCommentMutation } = usePostMutation();

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value); // 상태 업데이트
    setFormData(text);
  };

  //submit 요청보내기
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //초기 렌더링 시 author가 undefined라서, 리뷰를 제출할 때 author에 session?.fullName을 넣어줌
    addCommentMutation.mutate(
      { postId: listPostId, comment: formData },
      {
        onSuccess: () => {
          // 요청이 성공하면 모달 닫기
          onClose();
        },
      },
    );
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="comment-modal-box" onClick={(e) => e.stopPropagation()}>
          <p className="comment-box-title">댓글작성</p>
          <form className="" action="" onSubmit={onSubmitHandler}>
            <div className="comment-modal-top">
              <button onClick={onClose}>
                <ModalCloseIcon />
              </button>
            </div>

            {/* 상단 원본 글의 데이터 */}
            <div key={listPostId} className="comment-post-wrap">
              {listPostImg ? (
                <img className="profile-img" src={listPostImg} alt={listPostTitle} />
              ) : (
                <PlaceholderIcon />
              )}
              <div className="post-box">
                <div className="post-info">
                  <p className="nickname">{listFullname}</p>
                </div>
                <p className="post-contents">{listPostTitle}</p>
              </div>
            </div>

            <hr className="divide"></hr>

            <div className="modal-contents-wrap">
              {data?.image ? (
                <img className="profile-img" src={data.image} alt={data?.fullName} />
              ) : (
                <PlaceholderIcon />
              )}
              <div className="modal-contents">
                <textarea
                  className="textarea"
                  ref={textareaRef}
                  value={text}
                  onChange={onChangeHandler}
                  placeholder="내용을 입력하세요."
                />
              </div>
            </div>

            <div className="write-modal-bottom">
              <div className="comment-img-select">
                <button className="submit_button">게시</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WriteCommentModal;
