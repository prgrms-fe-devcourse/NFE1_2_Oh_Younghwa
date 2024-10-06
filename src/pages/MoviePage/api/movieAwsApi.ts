import { awsAxiosClient, movieApiAxiosClient } from '../../../shared/utils/axiosClient';
import { MovieListResponse } from '../model/movie';

// fetch 함수들을 여기에 작성
export const getMovieAwsApi = async () => {
  const response = await awsAxiosClient.get('/');
  return response.data;
};
