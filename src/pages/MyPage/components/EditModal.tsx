import { ChangeEvent, useState } from 'react';

import { useEditProfile } from '../hooks/useEditProfile';
import { useLogout } from '../hooks/useLogout';

import '../scss/editModal.scss';

interface EditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const EditModal = ({ isModalOpen, onClose }: EditModalProps) => {
  const { mutate: logout } = useLogout();
  const { mutate: editInfo } = useEditProfile();
  const [nickname, setNickname] = useState('');
  const [biography, setBiography] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [warn, setWarn] = useState('');
  // isModalOpen이 false이면 null을 반환해서 모달을 렌더링하지 않음
  if (!isModalOpen) return null;

  //유저 닉네임 변경 - 공란, 중복 불가
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) {
      return setWarn(() => '닉네임을 입력해주세요.');
    }

    // editInfo({ newName: nickname, newBio: biography, newImg: img });
    onClose();
  };

  //닉네임 상태 변경
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.currentTarget.value;
    setNickname(newNickname);
  };

  //소개글 상태 변경
  const changeBioState = (e: ChangeEvent<HTMLInputElement>) => {
    const newBio = e.currentTarget.value;
    setBiography(newBio);
  };

  //이미지 변경
  const changeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // 파일이 선택되었는지 확인
    if (files && files.length > 0) {
      const newImg = files; // FileList에서 첫 번째 파일만 선택
      // setImg(newImg); // File 타입의 개별 파일을 setImg에 전달
    } else {
      // 파일이 선택되지 않은 경우 null 처리를 위해 빈 값 전달
      setImg(null);
    }
  };

  //로그아웃
  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="file"></label>
            {/* <div className="profile-img-select">
              <input type="file" value={img} onChange={changeImg} />
            </div> */}
            <label>
              닉네임
              <input type="text" value={nickname} onChange={changeName} />
              <div className="check-nickname" style={{ color: 'red' }}>
                {warn}
              </div>
            </label>
            <label>
              소개
              <input type="text" value={biography} onChange={changeBioState} />
            </label>

            <button type="submit">수정하기</button>
          </form>
          <button className="modal-logout" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModal;
