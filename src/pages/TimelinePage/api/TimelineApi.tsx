import { postApiAxiosClient, postFormAxiosClient, reviewAxiosClient } from '../../../shared/utils/axiosClient';
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

const channelList = [
  '/posts/channel/66f50d3001d4aa076bcbdb99',
  '/posts/channel/66fa6380186a007fe2c4226b',
  '/posts/channel/66fa63d9186a007fe2c422bc',
  '/posts/channel/66fa6402186a007fe2c422c5',
  '/posts/channel/66fa641f186a007fe2c423ae',
  '/posts/channel/66fa6452186a007fe2c425c8',
];

export const getAllPosts = async () => {
  const responses = await Promise.all(
    channelList.map(async (channel) => {
      const response = await postApiAxiosClient.get<Post[]>(channel);
      return response.data;
    }),
  );
  return responses;
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

type PostType = {
  title: string;
  image: File | null;
  channelId: string;
};

type Comment = {
  comment: string;
  postId: string;
};

export const addPost = async ({ channelId, image, title }: PostType): Promise<Post> => {
  const request = postFormAxiosClient();
  console.log(channelId, image, title);
  const response = await request.post('/posts/create', {
    title,
    image,
    channelId,
  });
  console.log(response.data, '확인용');
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
