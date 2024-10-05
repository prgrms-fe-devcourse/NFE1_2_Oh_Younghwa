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
  newBio?: string | null;
  newImg?: File | null;
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
  const filteredData = reviewChannelRes.data.filter((item: { title?: string }) => item && item.title !== undefined);

  return filteredData;
};

//사용자 정보 변경
export const changeInfo = async ({ newName, newBio }: newInfo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const request = validateTokenAxiosClient(token);
    const responses = await request.put('/settings/update-user', {
      fullName: newName,
      username: newBio,
    });

    return responses.data;
  } catch (err) {
    console.error('정보 변경 불가: ', err);
  }
};

//사용자 프로필 이미지 변경
export const changeImg = async ({ newImg }: { newImg: File }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const formData = new FormData();
    formData.append('isCover', 'false'); // 문자열로 전달
    formData.append('image', newImg); // 이미지 파일 추가

    const request = validateTokenAxiosClient(token);
    const response = await request.post('/users/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 5000,
    });

    return response.data;
  } catch (err) {
    console.error('이미지 변경 불가: ', err);
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
