import { movieApiAxiosClient } from '../../../shared/utils/axiosClient';
import { MovieListResponse } from '../model/movie';

// fetch 함수들을 여기에 작성
export const getConfiguration = async () => {
  const response = await movieApiAxiosClient.get<string>(`/configuration`);
  return response.data;
};

export const getPopularMovies = async (page: number): Promise<MovieListResponse> => {
  const response = await movieApiAxiosClient.get<MovieListResponse>(`/movie/popular?language=en-US&page=${page}`);
  return response.data;
};
