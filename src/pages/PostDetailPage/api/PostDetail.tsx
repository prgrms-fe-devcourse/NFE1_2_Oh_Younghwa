import { postApiAxiosClient } from '../../../shared/utils/axiosClient';
import { Post } from '../model/article';

// fetch 함수들을 여기에 작성

export const getPost = async (postId: string): Promise<Post> => {
  try {
    const response = await postApiAxiosClient.get<Post>(`/posts/${postId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
