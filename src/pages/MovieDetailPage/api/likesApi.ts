import { reviewAxiosClient } from '../../../shared/utils/axiosClient';
import { Like } from '../../TimelinePage/model/article';

export const postLikes = async (postId: string): Promise<Like> => {
  const request = reviewAxiosClient();
  const response = await request.post('/likes/create', {
    postId,
  });
  return response.data;
};

export const deleteLikes = async (postId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.delete(`/likes/delete`, {
    data: {
      id: postId,
    },
  });
};
