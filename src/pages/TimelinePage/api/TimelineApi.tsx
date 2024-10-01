
import { postApiAxiosClient, reviewAxiosClient } from '../../../shared/utils/axiosClient';

import { Post } from '../model/article';

// fetch 함수들을 여기에 작성
export const getArticles = async (channelId: string): Promise<Post[]> => {
  try {
    const response = await postApiAxiosClient.get<Post[]>(`/posts/channel/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

export const deletePost = async (id: string): Promise<void> => {
  console.log(id, 'duri');
  const request = reviewAxiosClient();
  await request.delete<void>('/posts/delete', { data: { id } });
};
