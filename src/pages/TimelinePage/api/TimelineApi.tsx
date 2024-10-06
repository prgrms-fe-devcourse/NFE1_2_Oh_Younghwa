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
  '/posts/channel/6701580f426f72722a790504',
  '/posts/channel/67015828426f72722a790527',
  '/posts/channel/67015836426f72722a790542',
  '/posts/channel/67015845426f72722a790546',
  '/posts/channel/67015856426f72722a79054a',
  '/posts/channel/6701579b426f72722a7904cf',
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
