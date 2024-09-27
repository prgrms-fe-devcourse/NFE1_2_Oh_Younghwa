import { reviewAxiosClient } from "../../../shared/utils/axiosClient";

type Notification = {
    name : string,
    follow : boolean,
    like : boolean
}

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

export const getAllNotifications = async (): Promise<Notification[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Notification[]>(`/notifications`);
  return response.data;
};
