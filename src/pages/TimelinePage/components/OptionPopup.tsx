import { usePostMutation } from '../hooks/usePostMutation';

import '../scss/timeline.scss';

type postProp = {
  id: string;
};

const OptionPopup = ({ id }: postProp) => {
  const { deletePostMutation } = usePostMutation();

  return (
    <div className="option-button-wrap hidden">
      {/* <div className="option-button" onClick={() => setModalOpen(true)}>
        수정
      </div> */}
      <div className="option-button" onClick={() => deletePostMutation.mutate(id)}>
        삭제
      </div>
    </div>
  );
};

export default OptionPopup;
