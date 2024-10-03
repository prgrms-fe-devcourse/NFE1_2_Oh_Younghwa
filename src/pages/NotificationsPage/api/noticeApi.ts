import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type Author = {
  _id: string; // 작성자 ID
  fullName: string; // 작성자 이름
  image: string; // 작성자 이미지
};

type Follow = {
  _id: string; // 알림 ID
  user: string; // 사용자 ID
  follower: string; // 팔로워 ID
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
};

type Like = {
  author: Author;
  postId: string;
  postTitle: string;
  postImage: string;
};

type Notification = {
  _id: string;
  follow?: Follow;
  like?: Like;
  seen: boolean;
};

export const getAllNotifications = async (): Promise<Notification[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Notification[]>(`/notifications`);
  return response.data;
};

export const putNotificationSeen = async (notificationId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.put(`/notifications/seen`, { id: notificationId });
};

export const followUser = async (userId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.post('/follow/create', { userId });
};

export const getUser = async (userId: string): Promise<Author> => {
  const request = reviewAxiosClient();
  const response = await request.get(`/users/${userId}`);
  return response.data;
};
