import { User } from '../../pages/TimelinePage/model/article';
import { reviewAxiosClient } from '../utils/axiosClient';

export async function getUserDataById(userId: string) {
  const request = reviewAxiosClient();
  const response = await request.get<User>(`/users/${userId}`);
  return response.data;
}
