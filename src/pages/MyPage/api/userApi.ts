import { loginUserAxiosClient, validateTokenAxiosClient } from '../../../shared/utils/axiosClient';
import { Follow, User } from '../../TimelinePage/model/article';

//다른 유저의 마이페이지 보기
export const getOtherUsers = async (userId: string): Promise<User> => {
  const response = await loginUserAxiosClient.get<User>(`/users/${userId}`);

  return response.data;
};

//팔로우
export const followUser = async (userId: string, token: string): Promise<Follow> => {
  const client = validateTokenAxiosClient(token);

  try {
    const response = await client.post<Follow>('/follow/create', {
      user: userId,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('팔로우 실패');
  }
};
//언팔로우
// export const unfollowUser = async (followId: string): Promise<Follow> => {
//   const response = await loginUserAxiosClient.delete<Follow>('/follow/delete', { id: followId });

//   console.log(response.data);
//   return response.data;
// };

//로그아웃
export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const request = validateTokenAxiosClient(token);
    const response = await request.post('/logout', {});
    localStorage.removeItem('token');

    return response.data;
  } catch {
    console.log('로그아웃 실패');
    throw new Error('로그아웃 실패');
  }
};
