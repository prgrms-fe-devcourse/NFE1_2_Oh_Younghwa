import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type User = {
  userId: string;
  fullName: string;
  profileImage: string;
  followersCount: number;
  oneLinerMessage: string;
};

type Post = {
  postId: number;
  postTitle: string;
};

type SearchResult = {
  users: User[];
  posts: Post[];
};

// 유저 검색
export const searchUsers = async (query: string): Promise<User[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<User[]>(`/search/users/${query}`);
  return response.data;
};
// 포스트 검색
export const searchPosts = async (query: string): Promise<Post[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<SearchResult>(`/search/all/${query}`);
  return response.data.posts; // 모든 검색 결과에서 포스트만 필터링
};
