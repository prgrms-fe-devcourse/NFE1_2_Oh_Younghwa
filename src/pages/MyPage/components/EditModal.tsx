import { ChangeEvent, useRef, useState } from 'react';

import ProfileImageSelectIcon from '../../../shared/components/atom/icons/ProfileImageSelectIcon';
import { User } from '../../TimelinePage/model/article';
import { useEditProfile } from '../hooks/useEditProfile';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { useLogout } from '../hooks/useLogout';

import '../scss/editModal.scss';

interface EditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditModal = ({ isModalOpen, onClose, user }: EditModalProps) => {
  const { data, isLoading, error } = useGetAllUsers(); //닉네임 중복확인
  const { mutate: logout } = useLogout();
  const { mutate: editInfo } = useEditProfile();

  const [nickname, setNickname] = useState(user.fullName); //닉네임
  const [biography, setBiography] = useState(''); //소개글
  const [img, setImg] = useState<File | null>(null); //결정된 이미지
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); //선택한 이미지 미리보기
  const [nickWarn, setNickWarn] = useState(''); //닉네임 조건 어기면 경고
  const [bioWarn, setBioWarn] = useState(''); //소개글 조건 어기면 경고
  const inputRef = useRef<HTMLInputElement | null>(null); //input type="file" 호출용

  const fullNameArr = data?.map((names) => names.fullName); //모든 사용자 fullName 담은 배열

  // isModalOpen이 false이면 null을 반환해서 모달을 렌더링하지 않음
  if (!isModalOpen) return null;

  //유저 닉네임 변경 - 공란, 중복 불가
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) {
      return setNickWarn(() => '닉네임을 입력해주세요.');
    } else if (nickname.length > 10) {
      return setNickWarn(() => '닉네임은 10자 이내로 입력해주세요.');
    } else if (fullNameArr && fullNameArr.includes(nickname)) {
      return setNickWarn(() => '중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
    } else if (biography.length > 120) {
      return setBioWarn(() => '소개글은 120자 이내로 입력해주세요.');
    }

    editInfo({ newName: nickname, newBio: biography, newImg: img });
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
    const file = e.target.files?.[0] || null;

    // 파일이 선택되었는지 확인
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // 기존에 생성된 URL 해제
      }
      const imageUrl = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
      setPreviewUrl(imageUrl); // 미리보기 URL 상태로 저장
      setImg(file); // File 타입의 개별 파일을 setImg에 전달
    } else {
      // 파일이 선택되지 않은 경우 null 처리를 위해 빈 값 전달
      setImg(null);
      setPreviewUrl(null);
    }
  };

  //아이콘 누르면 input type="file" 호출
  const handleFileClick = () => {
    inputRef.current!.click();
  };

  //로그아웃
  const logoutHandler = () => {
    logout();
  };

  if (isLoading) <div>로딩중...</div>;
  if (error) <div>로딩중...</div>;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            {!previewUrl && (
              <div className="profile-img-select" onClick={handleFileClick} style={{ cursor: 'pointer' }}>
                <ProfileImageSelectIcon />
              </div>
            )}

            {/* input 숨겨놓고 아이콘 누르면 호출되도록 */}
            <input
              ref={inputRef}
              className="profile-img-select-input"
              type="file"
              onChange={changeImg}
              style={{ display: 'none' }}
            />

            {/* 미리보기 */}
            {previewUrl && (
              <div className="profile-img-select-preview" onClick={handleFileClick} style={{ cursor: 'pointer' }}>
                <img src={previewUrl} alt="Image Preview" />
              </div>
            )}

            <label>
              닉네임
              <input type="text" value={nickname} onChange={changeName} onFocus={() => setNickWarn('')} />
              <div className="check-nickname" style={{ color: 'red' }}>
                {nickWarn}
              </div>
            </label>
            <label>
              소개
              <input type="text" value={biography} onChange={changeBioState} onFocus={() => setBioWarn('')} />
              <div className="check-nickname" style={{ color: 'red' }}>
                {bioWarn}
              </div>
            </label>

            <button className="submit-btn" type="submit">
              수정하기
            </button>
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
