import { movieApiAxiosClient } from '../../../shared/utils/axiosClient';
import { MovieListResponse, SearchMovieListResponse } from '../model/movie';

import { getMovieAwsApi } from './movieAwsApi';

// fetch 함수들을 여기에 작성
export const getConfiguration = async () => {
  const response = await movieApiAxiosClient.get<string>(`/configuration`);
  return response.data;
};

export const getPopularMovies = async (): Promise<MovieListResponse> => {
  const start1 = performance.now(); // 첫 번째 API 요청 시작 시간

  const response = await movieApiAxiosClient.get<MovieListResponse>(`/movie/popular?language=ko-KR&page=1&region=KOR`);
  const end1 = performance.now(); // 첫 번째 API 요청 끝 시간
  const time1 = end1 - start1;
  console.log('tmdb API 요청 시간: ', time1);
  return response.data;
};

export const getSearchedMovies = async (searchKeyword: string): Promise<SearchMovieListResponse> => {
  const encodedStr = encodeURIComponent(searchKeyword);
  const response = await movieApiAxiosClient.get(
    `/search/movie?query=${encodedStr}&include_adult=false&language=ko-KR&page=1`,
  );

  return response.data;
};
// export const measureAverageRequestTimeTMDB = async (iterations: number = 10): Promise<number> => {
//   const times: number[] = [];

//   for (let i = 0; i < iterations; i++) {
//     const start = performance.now();
//     await getPopularMovies(); // API 호출
//     const end = performance.now();
//     const time = end - start;
//     times.push(time); // 요청 시간 저장
//   }

//   // 평균 계산
//   const total = times.reduce((acc, curr) => acc + curr, 0);
//   const averageTime = total / times.length;

//   console.log(`tmdb평균 요청 시간: ${averageTime}ms`);
//   return averageTime;
// };
// export const measureAverageRequestTimeAWS = async (iterations: number = 10): Promise<number> => {
//   const times: number[] = [];

//   for (let i = 0; i < iterations; i++) {
//     const start = performance.now();
//     await getMovieAwsApi(); // API 호출
//     const end = performance.now();
//     const time = end - start;
//     times.push(time); // 요청 시간 저장
//   }

//   // 평균 계산
//   const total = times.reduce((acc, curr) => acc + curr, 0);
//   const averageTime = total / times.length;

//   console.log(`aws평균 요청 시간: ${averageTime}ms`);
//   return averageTime;
// };
