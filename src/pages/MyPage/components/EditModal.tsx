import { useLogout } from '../hooks/useLogout';

import '../scss/editModal.scss';

interface EditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const EditModal = ({ isModalOpen, onClose }: EditModalProps) => {
  const { mutate: logout } = useLogout();
  // isModalOpen이 false이면 null을 반환해서 모달을 렌더링하지 않음
  if (!isModalOpen) return null;

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <label htmlFor="file"></label>
          <div className="profile-img-select">
            <input type="file" />
          </div>
          <button className="modal-logout" onClick={logoutHandler}>
            로그아웃
          </button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </>
  );
};

export default EditModal;
