import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type Notification = {
  userId: string;
  id: number;
  name: string;
  follow: boolean;
  like: boolean;
  read: boolean;
  image: string;
  postId?: number;
  postTitle?: string;
  postImage?: string;
};

export const getAllNotifications = async (): Promise<Notification[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Notification[]>(`/notifications`);
  return response.data;
};

export const putNotificationSeen = async (notificationId: number): Promise<void> => {
  const request = reviewAxiosClient();
  await request.put(`/notifications/seen`, { id: notificationId });
};

export const followUser = async (userId: string): Promise<void> => {
  const request = reviewAxiosClient();
  await request.post('/follow/create', { userId });
};

// export const postNoti = async ({ name, follow, like }: Notification): Promise<Notification> => {
//   const request = reviewAxiosClient();
//   const response = await request.post<Notification>('/notifications', {
//    name,
//    follow,
//    like
//   });
//   console.log(response.data);
//   return response.data;
// };
