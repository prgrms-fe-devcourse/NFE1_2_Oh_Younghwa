import { postApiAxiosClient, reviewAxiosClient } from '../../../shared/utils/axiosClient';
import { Post } from '../model/article';

type PostRequest = {
  postId: string;
  title: string;
  image: string | null;
  channelId: string;
};

// fetch 함수들을 여기에 작성
export const getArticles = async (channelId: string): Promise<Post[]> => {
  try {
    const response = await postApiAxiosClient.get<Post[]>(`/posts/channel/${channelId}`);
    console.log('🚀 ~ getArticles ~ response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

export const deletePost = async (id: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.delete<void>('/posts/delete', { data: { id } });
};

export const updatePost = async ({ postId, title, image, channelId }: PostRequest): Promise<PostRequest> => {
  const request = reviewAxiosClient();
  const response = await request.put('/posts/update', {
    postId,
    title,
    image,
    channelId,
  });
  return response.data;
};
