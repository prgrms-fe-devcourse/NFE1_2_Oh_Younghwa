import { reviewAxiosClient } from '../../../shared/utils/axiosClient';
import { Like } from '../model/article';

type Id = {
  postId: string;
  authorId: string;
};

export const postLikes = async ({ postId, authorId }: Id): Promise<void> => {
  const request = reviewAxiosClient();
  const response = await request.post('/likes/create', {
    postId,
  });

  const notificationPayload = {
    notificationType: 'LIKE',
    notificationTypeId: response.data._id,
    userId: authorId,
    postId: postId,
  };
  console.log(notificationPayload, 'Payload체크');
  await request.post('/notifications/create', notificationPayload);
};

export const deleteLikes = async (postId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.delete(`/likes/delete`, {
    data: {
      id: postId,
    },
  });
};
