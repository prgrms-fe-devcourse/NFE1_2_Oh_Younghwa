import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type Author = {
  _id: string;
  fullName: string;
  image: string;
  followers: string[];
};

type Follow = {
  _id: string;
  user: string;
  follower: string;
};

type Post = {
  image: string;
  user: string;
  _id: string;
  author: string;
  title: string;
};
type Like = {
  author: string;
  post: Post;
  user: string;
};

type Notification = {
  notificationType: string;
  _id: string;
  follow: Follow;
  like: Like;
  seen: boolean;
};

export const getAllNotifications = async (): Promise<Notification[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Notification[]>(`/notifications`);
  console.log(response.data);
  return response.data;
};

export const putNotificationSeen = async (notificationId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.put(`/notifications/seen`, { id: notificationId });
};

export const followUser = async (userId: string): Promise<void> => {
  const request = reviewAxiosClient();
  const response = await request.post('/follow/create', {
    userId: userId,
  });
  const notificationPayload = {
    notificationType: 'FOLLOW',
    notificationTypeId: response.data._id,
    userId: userId,
    postId: null,
  };
  await request.post('/notifications/create', notificationPayload);
};

export const getUser = async (userId: string): Promise<Author> => {
  const request = reviewAxiosClient();
  const response = await request.get(`/users/${userId}`);
  return response.data;
};
