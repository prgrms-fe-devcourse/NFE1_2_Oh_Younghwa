import { usePostMutation } from '../hooks/usePostMutation';

import '../scss/timeline.scss';

type postProp = {
  id: string;
};

const OptionPopup = ({ id }: postProp) => {
  // const data = id
  // const { data, isError, isLoading } = useDeletePost(postId);
  console.log(id, 'start');
  const { deletePostMutation } = usePostMutation();

  return (
    <div className="option-button-wrap hidden">
      <div className="option-button">수정</div>
      <div className="option-button" onClick={() => deletePostMutation.mutate(id)}>
        삭제
      </div>
    </div>
  );
};

export default OptionPopup;
