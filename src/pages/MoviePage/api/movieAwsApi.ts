import { awsAxiosClient, movieApiAxiosClient } from '../../../shared/utils/axiosClient';
import { MovieListResponse } from '../model/movie';

// fetch 함수들을 여기에 작성
export const getMovieAwsApi = async (): Promise<MovieListResponse[]> => {
  const start1 = performance.now(); // 첫 번째 API 요청 시작 시간

  const response = await awsAxiosClient.get('/');
  const end1 = performance.now(); // 첫 번째 API 요청 끝 시간
  const time1 = end1 - start1;
  console.log('aws API 요청 시간: ', time1);
  return response.data;
};
