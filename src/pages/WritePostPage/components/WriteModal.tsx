import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import ModalCloseIcon from '../../../shared/components/atom/icons/ModalCloseIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
import { useGetUsers } from '../../MyPage/hooks/useGetUsers';
import { usePostMutation } from '../../TimelinePage/hooks/usePostMutation';

import '../scss/writeModal.scss';

interface EditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const WriteModal = ({ isModalOpen, onClose }: EditModalProps) => {
  //모달 온오프
  if (!isModalOpen) return null;
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

  //form data 전달하기
  const [textData, setTextData] = useState('');
  const [Selected, setSelected] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { addPostMutation } = usePostMutation();

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    setText(newText); // 상태 업데이트
    setTextData(text);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file); // 파일 객체를 상태에 설정
    } else {
      setImage(null); // 파일이 없을 경우 상태 초기화
    }
  };

  //submit 요청보내기
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textData.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    addPostMutation.mutate(
      { channelId: Selected, image: image, title: textData },
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
          <p className="modal-box-title">포스트 작성하기</p>
          <form className="" action="" onSubmit={onSubmitHandler}>
            <div className="modal-top">
              <div className="select-channel">
                <select
                  className="select-custom"
                  onChange={(e) => {
                    setSelected(e.target.value);
                  }}
                  defaultValue="66f50d3001d4aa076bcbdb99"
                >
                  <option value="66f50d3001d4aa076bcbdb99">전체</option>
                  <option value="66fa6380186a007fe2c4226b">액션</option>
                  <option value="66fa63d9186a007fe2c422bc">로맨스</option>
                  <option value="66fa6402186a007fe2c422c5">호러</option>
                  <option value="66fa641f186a007fe2c423ae">SF</option>
                  <option value="66fa6452186a007fe2c425c8">독립영화</option>
                </select>
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
                  value={text}
                  onChange={onChangeHandler}
                  placeholder="내용을 입력하세요."
                />
              </div>
            </div>
            <div className="write-modal-bottom">
              <div className="content-img-select">
                <label htmlFor="file">
                  <input type="file" accept="image/jpg, umage/jpeg, image/png" onChange={handleFileChange} id="file" />
                </label>
                <button className="submit_button">게시</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WriteModal;
