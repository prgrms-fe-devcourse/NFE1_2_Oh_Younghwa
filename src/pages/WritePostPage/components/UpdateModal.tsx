import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import GenreSelectButtonInModalIcon from '../../../shared/components/atom/icons/GenreSelectButtonInModalIcon';
import ModalCloseIcon from '../../../shared/components/atom/icons/ModalCloseIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
import { useGetUsers } from '../../MyPage/hooks/useGetUsers';
import { usePostMutation } from '../../TimelinePage/hooks/usePostMutation';

import '../scss/writeModal.scss';

interface EditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  listPostId: string;
  listChannelId: string;
  listPostTitle: string;
}

type Text = {
  title: string;
};

const UpdateModal = ({ listPostId, listChannelId, listPostTitle, isModalOpen, onClose }: EditModalProps) => {
  //모달 온오프
  if (!isModalOpen) return null;

  const { data, isLoading, error } = useGetUsers();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

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
  const { updatePostMutation } = usePostMutation();

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value); // 상태 업데이트
    setFormData(text);
  };

  //submit 요청보내기
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //초기 렌더링 시 author가 undefined라서, 리뷰를 제출할 때 author에 session?.fullName을 넣어줌
    updatePostMutation.mutate(
      { postId: listPostId, channelId: listChannelId, image: null, title: formData },
      {
        onSuccess: () => {
          // 요청이 성공하면 모달 닫기
          onClose();
        },
      },
    );
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <form className="" action="" onSubmit={onSubmitHandler}>
            <div className="modal-top">
              <div className="select-channel">
                선택된장르
                <GenreSelectButtonInModalIcon />
              </div>
              <button onClick={onClose}>
                <ModalCloseIcon />
              </button>
            </div>

            <div className="modal-contents-wrap">
              {data?.image ? (
                <img className="profile-img" src={data.image} alt={data?.fullName} />
              ) : (
                <PlaceholderIcon />
              )}
              <div className="modal-contents">
                <p>{data?.fullName}</p>
                <textarea
                  className="textarea"
                  ref={textareaRef}
                  defaultValue={listPostTitle}
                  onChange={onChangeHandler}
                  placeholder="내용을 입력하세요."
                />
              </div>
            </div>
            <div className="write-modal-bottom">
              <label htmlFor="file"></label>
              <div className="content-img-select">
                <input type="file" />
                <button>게시</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
