import { reviewAxiosClient } from '../../../shared/utils/axiosClient';

type Review = {
  title: string;
  image: string;
  channelId: string;
};

export const postReview = async ({ title, image, channelId }: Review): Promise<Review> => {
  const request = reviewAxiosClient();
  const response = await request.post<Review>('/posts/creaㄴte', {
    title,
    image,
    channelId,
  });
  console.log(response.data);
  return response.data;
};

export const getReviewsByMovieTitle = async (title: string): Promise<Review[]> => {
  const request = reviewAxiosClient();
  const response = await request.get<Review[]>(`/search/all/${title}`);
  return response.data;
};
