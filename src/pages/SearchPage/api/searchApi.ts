import { reviewAxiosClient } from '../../../shared/utils/axiosClient';
type User = {
  _id: string;
  fullName: string;
  followers: [];
  messages: string;
  image: string;
};

type Post = {
  _id: string;
  title: string;
  updatedAt: string;
  author: User;
  likes: [];
  comments: [];
  image?: string;
};

export const recommendPosts = async (): Promise<Post[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Post[]>(`/posts/channel/66f50d3001d4aa076bcbdb99`);
  const sortedPosts = response.data.sort((a, b) => b.likes.length - a.likes.length);
  return sortedPosts;
};

// 유저 검색
export const searchUsers = async (query: string): Promise<User[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<User[]>(`/search/users/${query}`);
  const filteredUsers = response.data.filter((user) => user.fullName.includes(query));
  return filteredUsers;
};

// 포스트 검색
export const searchPosts = async (title: string): Promise<Post[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Post[]>(`/posts/channel/66f50d3001d4aa076bcbdb99`);
  console.log(response);

  // title이 포함되거나 일치하는 포스트만 필터링
  const filteredPosts = response.data.filter((post) => post.title.includes(title) && !post.title.startsWith('#'));

  return filteredPosts;
};

// 태그 검색
export const searchTags = async (title: string): Promise<Post[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Post[]>(`/posts/channel/66f50d3001d4aa076bcbdb99`);

  const filteredPosts = response.data.filter((post) => post.title === `#${title}`);

  return filteredPosts;
};

// 작성자 정보 가져오기
export const getUserById = async (userId: string): Promise<User> => {
  const request = reviewAxiosClient();
  const response = await request.get<User>(`/users/${userId}`);
  return response.data;
};
