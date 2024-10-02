import { reviewAxiosClient, validateTokenAxiosClient } from '../../../shared/utils/axiosClient';
import { Follow, User } from '../../TimelinePage/model/article';

//다른 유저의 마이페이지 보기
export const getOtherUsers = async (userId: string): Promise<User> => {
  const request = reviewAxiosClient();
  const response = await request.get<User>(`/users/${userId}`);

  return response.data;
};

//팔로우
export const followUser = async (userId: string): Promise<Follow> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const request = validateTokenAxiosClient(token);
    const response = await request.post<Follow>('/follow/create', {
      userId: userId,
    });

    const notificationPayload = {
      notificationType: 'FOLLOW',
      notificationTypeId: response.data._id,
      userId: userId,
      postId: null,
    };
    console.log(notificationPayload);
    await request.post('/notifications/create', notificationPayload);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('팔로우 실패');
  }
};

//언팔로우
export const unfollowUser = async (followId: string): Promise<Follow> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    const request = validateTokenAxiosClient(token);
    const response = await request.delete<Follow>('/follow/delete', {
      data: { id: followId },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('언팔로우 실패');
  }
};

//로그아웃
export const logoutUser = async (): Promise<void> => {
  try {
    //토큰이 있는 사용자인지 확인
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
