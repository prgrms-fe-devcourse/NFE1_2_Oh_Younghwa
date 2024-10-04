import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type Post = {
  title: string;
  image: string | null;
  channelId: string;
};

type Comment = {
  comment: string;
  postId: string;
};

export const addPost = async ({ title, image, channelId }: Post): Promise<Post> => {
  const request = reviewAxiosClient();
  const response = await request.post('/posts/create', {
    title,
    image,
    channelId,
  });
  return response.data;
};

export const addComment = async ({ comment, postId }: Comment): Promise<Post> => {
  const request = reviewAxiosClient();
  const response = await request.post('/comments/create', {
    comment,
    postId,
  });
  return response.data;
};
