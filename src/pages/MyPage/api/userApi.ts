import { reviewAxiosClient, validateTokenAxiosClient } from '../../../shared/utils/axiosClient';
import { Follow, User } from '../../TimelinePage/model/article';

export interface Review {
  rating: number;
  review: string;
  title: string;
  author: string;
  createdAt: string;
  likes: string[];
  authorId: string;
  channelId: string;
  postId: string;
}
export interface newInfo {
  newName: string;
  newBio?: string;
  newImg?: string;
}

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

//영화리뷰 채널에서 전체 리뷰 포스트 가져오기
export const getReviewsByUsername = async (fullName: string): Promise<Review[]> => {
  const request = reviewAxiosClient();
  const reviewChannelRes = await request.get<Review[]>(`/search/all/${fullName}`);
  //undefined인 경우 걸러내기
  console.log('🚀 ~ getReviewsByUsername ~ reviewChannelRes:', reviewChannelRes);
  const filteredData = reviewChannelRes.data.filter((item: { title?: string }) => item && item.title !== undefined);
  return filteredData;
};

//사용자 정보 변경
export const changeUserInfo = async ({ newName, newBio, newImg }: newInfo): Promise<newInfo[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const request = validateTokenAxiosClient(token);
    const responses = await Promise.all([
      newName || newBio
        ? request.put('/settings/update-user', {
            fullName: newName,
            username: newBio,
          })
        : null,
      newImg
        ? request.put('/users/upload-photo', {
            isCover: false,
            image: newImg,
          })
        : null,
    ]);

    // null 제외
    return responses.filter((response) => response !== undefined && response !== null).map((response) => response.data);
  } catch (err) {
    console.error('정보 변경 불가: ', err);
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

    if (response.status === 200) {
      console.log('로그아웃 성공');
      localStorage.removeItem('token');
    } else if (response.status === 401) {
      console.log('로그아웃 실패: 인증되지 않은 사용자입니다.');
    }

    return response.data;
  } catch (error) {
    console.log('로그아웃 실패');
    throw new Error('로그아웃 실패');
  }
};
